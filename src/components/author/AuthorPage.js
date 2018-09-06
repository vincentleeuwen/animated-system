import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AuthorList from './AuthorList';

class AuthorPage extends Component {
  render() {
    const { authors } = this.props;
    console.log(authors);
    return (
      <div>
        <h1>Authors</h1>
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
