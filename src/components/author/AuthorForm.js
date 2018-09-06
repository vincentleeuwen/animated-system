import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({ author, onSave, onChange, saving, errors }) => {
  return (
    <form>
      <h1>Manage author</h1>
      <TextInput
        name="firstName"
        label="First name"
        value={author.firstName}
        onChange={onChange}
        error={errors.title}
      />
      <TextInput
        name="lastName"
        label="Last name"
        value={author.lastName}
        onChange={onChange}
        error={errors.title}
      />
      <TextInput
        name="id"
        label="Author ID"
        value={author.id}
        onChange={onChange}
        error={errors.title}
      />
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}
      />
    </form>
  );
};

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.object
};

export default AuthorForm;
