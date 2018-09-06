import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AuthorListRow = ({ author }) => {
  return (
    <tr>
      <td>
        <Link to={`/author/${author.id}`}>{author.firstName}</Link>
      </td>
      <td>{author.lastName}</td>
      <td>{author.id}</td>
    </tr>
  );
};

AuthorListRow.propTyps = {
  author: PropTypes.object.isRequired
};

export default AuthorListRow;
