import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action', () => {

      // arrange
      const course = { id: 'clean-code', title: 'Clean code' };
      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course
      };

      // act
      const action = courseActions.createCourseSuccess(course);

      // assert
      expect(action).toEqual(expectedAction);

    });
  });
});
