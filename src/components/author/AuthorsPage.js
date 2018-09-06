import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class AuthorsPage extends Component {
  render() {
    const { authors } = this.props;
    console.log(authors);
    return (
      <div>
        <h1>Authors</h1>
        <pre>{JSON.stringify(authors)}</pre>
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors
  };
}

export default connect(mapStateToProps)(AuthorsPage);
