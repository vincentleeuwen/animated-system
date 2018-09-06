import React, { PropTypes } from 'react';

const DeleteAuthorForm = ({ author, deleting, onClick }) => {
  return (
    <form>
      <br />
      <h3>Delete author</h3>
      <input
        type="submit"
        className="btn btn-danger"
        disabled={deleting}
        value={deleting ? 'Deleting...' : 'Delete'}
        onClick={onClick}
      />

    </form>
  );
};

DeleteAuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  deleting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DeleteAuthorForm;
