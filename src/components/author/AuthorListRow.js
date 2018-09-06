import React, { PropTypes } from 'react';

const AuthorListRow = ({ author }) => {
  return (
    <tr>
      <td>{author.firstName}</td>
      <td>{author.lastName}</td>
      <td>{author.id}</td>
    </tr>
  );
};

AuthorListRow.propTyps = {
  author: PropTypes.object.isRequired
};

export default AuthorListRow;
