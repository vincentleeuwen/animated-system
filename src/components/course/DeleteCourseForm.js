import React, { PropTypes } from 'react';

const DeleteCourseForm = ({ course, onClick, deleting }) => {
  return (
    <form>
      <br />
      <h3>Delete course</h3>
      <input
        type="submit"
        className="btn btn-danger"
        value={deleting ? 'Deleting...' : 'Delete'}
        disabled={deleting}
        onClick={onClick}
      />
    </form>
  );
};

DeleteCourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  deleting: PropTypes.bool.isRequired
};

export default DeleteCourseForm;
