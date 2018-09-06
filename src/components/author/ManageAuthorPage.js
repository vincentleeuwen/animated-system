import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import AuthorForm from './AuthorForm';
import * as authorActions from '../../actions/authorActions';

class ManageAuthorPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
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
    const { author } = this.state;
    this.props.actions.saveAuthor(Object.assign({}, author))
      .then(() => this.redirect());
  }
  redirect() {
    browserHistory.push('/authors');
  }
  render() {
    const { saving, errors, author } = this.state;
    return (
      <AuthorForm
        author={author}
        errors={errors}
        saving={saving}
        onChange={this.updateAuthorState}
        onSave={this.saveAuthor}
      />
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object,
  actions: PropTypes.array.isRequired
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

  if (authorId && state.authors > 0) {
    author = getAuthorById(authorId);
  }

  return {
    author
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
