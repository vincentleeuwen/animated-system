import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

import AuthorForm from './AuthorForm';
import DeleteAuthorForm from './DeleteAuthorForm';
import * as authorActions from '../../actions/authorActions';

class ManageAuthorPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false,
      deleting: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.author.id != nextProps.author.id) {
  //     // Nessecary to populate form when existing course is loaded directly
  //     this.setState({ author: Object.assign({}, nextProps.author)});
  //   }
  // }
  updateAuthorState(event) {
    const field = event.target.name;
    let author = Object.assign({}, this.state.author);
    author[field] = event.target.value;
    this.setState({ author });
  }
  saveAuthor(event) {
    event.preventDefault();
    this.setState({ saving: true });
    const { author } = this.state;
    this.props.actions.saveAuthor(Object.assign({}, author))
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }
  deleteAuthor(event) {
    event.preventDefault();
    this.setState({ deleting: true });
    if (this.props.coursesByAuthor > 0) {
      toastr.error('This author has courses listed');
      this.setState({ deleting: false });
    } else {
      this.props.actions.deleteAuthor(this.state.author.id)
        .then(() => {
          this.setState({ deleting: false });
          toastr.success('Author deleted!');
          browserHistory.push('/authors');
        })
        .catch(error => {
          toastr.error(error);
          this.setState({ deleting: false });
        });
    }
  }
  redirect() {
    this.setState({ saving: false });
    toastr.success('Author saved!');
    browserHistory.push('/authors');
  }
  render() {
    const { saving, errors, author, deleting } = this.state;
    return (
      <div>
        <AuthorForm
        author={author}
        errors={errors}
        saving={saving}
        onChange={this.updateAuthorState}
        onSave={this.saveAuthor}
      />
      <DeleteAuthorForm
        author={author}
        onClick={this.deleteAuthor}
        deleting={deleting}
      />
      </div>
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object,
  actions: PropTypes.array.isRequired,
  coursesByAuthor: PropTypes.number.isRequired
};

function getAuthorById(authorId, authors) {
  const author = authors.filter(author => author.id == authorId);
  if (author) return author[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.params.id;  // from the path `/course/:id`

  let author = {
    id: '',
    firstName: '',
    lastName: ''
  };
  let coursesByAuthor = 0;

  if (authorId && state.authors.length > 0) {
    author = getAuthorById(authorId, state.authors);
    coursesByAuthor = state.courses.filter(course => course.authorId === authorId).length;
  }

  return {
    author,
    coursesByAuthor
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
