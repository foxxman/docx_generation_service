import { compareParagraph, ICompareResults } from "../";

describe('Compare Paragraphs', () => {
    it('1. Should return null when incoming and existing paragraphs match', () => {
      const result = compareParagraph({ incoming: 'Hello.', existing: 'Hello.' });
      expect(result).toBeNull();
    });

    it('2. Should return null for empty strings', () => {
      const result = compareParagraph({ incoming: '', existing: '' });
      expect(result).toBeNull();
    });
  
    it('3. Should return compare results for non-matching paragraphs', () => {
      const incoming = 'This is a new paragraph.';
      const existing = 'This is an existing paragraph.';
      const expected: ICompareResults = {
        incoming: '1. This is a new paragraph. \n',
        existing: '1. This is an existing paragraph. \n',
      };
      const result = compareParagraph({ incoming, existing });
      expect(result).toEqual(expected);
    });

    it('4. Should return compare results for paragraphs with dif. number of suggestions', () => {
      const incoming = 'This is a new paragraph. \t This is a new paragraph.';
      const existing = 'This is a new paragraph. \t This is an existing paragraph. \t This is a new paragraph.';
      const expected: ICompareResults = {
        incoming: '2. This is a new paragraph. \n3. - \n',
        existing: '2. This is an existing paragraph. \n3. This is a new paragraph. \n',
      };
      const result = compareParagraph({ incoming, existing });
      expect(result).toEqual(expected);
    });
  
    it('5. Should return compare results for one empty paragraph and one non-empty paragraph', () => {
      const incoming = '';
      const existing = 'Non-empty paragraph.';
      const expected: ICompareResults = {
        incoming: '1. - \n',
        existing: '1. Non-empty paragraph. \n',
      };
      const result = compareParagraph({ incoming, existing });
      expect(result).toEqual(expected);
    });
  
    it('6. Should return compare results for one non-empty paragraph and one empty paragraph', () => {
      const incoming = 'Non-empty paragraph.';
      const existing = '';
      const expected: ICompareResults = {
        incoming: '1. Non-empty paragraph. \n',
        existing: '1. - \n',
      };
      const result = compareParagraph({ incoming, existing });
      expect(result).toEqual(expected);
    });
  });