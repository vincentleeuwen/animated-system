import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}

export function loadAuthors() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function saveAuthor(author) {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return AuthorApi.saveAuthor(author).then(savedAuthor => {
      author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
        dispatch(createAuthorSuccess(savedAuthor));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw error;
    });
  };
}
