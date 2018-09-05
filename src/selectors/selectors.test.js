import expect from 'expect';
import { authorsFormattedForDropdown } from './selectors';

describe('Selectors', () => {
  describe('authorsFormattedForDropdown', () => {
    it('should return author date suited for dropdown', () => {
      const authors = [{
        id: 'cory-house', firstName: 'Cory', lastName: 'House'
      }];

      const expected = [{
        value: 'cory-house', text: 'Cory House'
      }];

      expect(authorsFormattedForDropdown(authors)).toEqual(expected);
    });
  });
});
