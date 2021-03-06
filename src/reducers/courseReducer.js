import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  switch(action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.CREATE_COURSE_SUCCESS:
      // @dev: spread operator (...state) creates a new copy of the state array
      // we then add a new copy of action.course to the array
      return [
        ...state,
        Object.assign({}, action.course)
      ];
    case types.UPDATE_COURSE_SUCCESS:
      // @dev: spread operator (...state) creates a new copy of the filtered state array
      // we then add a new copy of action.course to the array
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];
    default:
      return state;
  }
}
