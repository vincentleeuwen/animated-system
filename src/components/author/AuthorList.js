import React, { PropTypes } from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({ authors }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {
          authors.map(author => <AuthorListRow key={author.id} author={author} />)
        }
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired
};

export default AuthorList;
