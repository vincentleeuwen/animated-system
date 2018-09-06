import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AuthorList from './AuthorList';
import { browserHistory } from 'react-router';

class AuthorPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAuthorPage = this.redirectToAuthorPage.bind(this);
  }
  redirectToAuthorPage(event) {
    event.preventDefault();
    browserHistory.push('/author');
  }
  render() {
    const { authors } = this.props;
    return (
      <div>
        <h1>Authors</h1>
        <input
          type="submit"
          value="Create author"
          className="btn btn-primary"
          onClick={this.redirectToAuthorPage}

        />
        <br />
        <br />
        <AuthorList authors={authors} />
      </div>
    );
  }
}

AuthorPage.propTypes = {
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors
  };
}

export default connect(mapStateToProps)(AuthorPage);
