import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import { authorsFormattedForDropdown } from '../../selectors/selectors';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import DeleteCourseForm from './DeleteCourseForm';

export class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false,
      deleting: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course && nextProps.course) {
      if (this.props.course.id != nextProps.course.id) {
        // Nessecary to populate form when existing course is loaded directly
        this.setState({ course: Object.assign({}, nextProps.course)});
      }
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({ course });
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) return;

    this.setState({ saving: true });
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }
  deleteCourse(event) {
    event.preventDefault();
    this.setState({ deleting: true });
    this.props.actions.deleteCourse(this.state.course.id)
      .then(() => {
        toastr.success('Course deleted!');
        this.setState({ deleting: false });
        this.context.router.push('/courses');
      })
      .catch(error => {
        toastr.error(error);
        this.setState({ deleting: false });
      });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Course saved!');
    this.context.router.push('/courses');
  }

  render() {
    const { course, errors, saving, deleting } = this.state;
    const { authors } = this.props;
    return (
      <div>
        <CourseForm
          course={course}
          errors={errors}
          allAuthors={authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          saving={saving}
        />
        <DeleteCourseForm
          course={course}
          onClick={this.deleteCourse}
          deleting={deleting}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, courseId) {
  const course  = courses.filter(course => course.id === courseId);
  if (course) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id;  // from the path `/course/:id`

  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: ''
  };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
