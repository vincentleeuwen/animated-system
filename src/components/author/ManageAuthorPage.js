import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AuthorForm from './AuthorForm';

class ManageAuthorPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
  }
  updateAuthorState(event) {
    const field = event.target.name;
    let author = Object.assign({}, this.state.author);
    author[field] = event.target.value;
    this.setState({ author });
  }
  saveAuthor(event) {
    event.preventDefault();
    this.context.router.push('/authors');
  }
  render() {
    const { saving, errors, author } = this.state;
    return (
      <AuthorForm
        author={author}
        errors={errors}
        saving={saving}
        onChange={this.updateAuthorState}
      />
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object
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

export default connect(mapStateToProps)(ManageAuthorPage);
