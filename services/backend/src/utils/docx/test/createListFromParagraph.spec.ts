import { createListFromParagraph } from '../createListFromParagraph';

describe('createListFromParagraph', () => {
  it('1. Should create a list with a single item', () => {
    const result = createListFromParagraph({ text: 'Item 1' });
    expect(result).toEqual(['1. Item 1']);
  });

  it('2. Should create a list with multiple items', () => {
    const result = createListFromParagraph({ text: 'Item 1 \t Item 2 \t Item 3' });
    expect(result).toEqual(['1. Item 1', '2. Item 2', '3. Item 3']);
  });

  it('3. Should ignore leading and trailing spaces', () => {
    const result = createListFromParagraph({ text: '  Item 1 \t  Item 2  \t  Item 3  ' });
    expect(result).toEqual(['1. Item 1', '2. Item 2', '3. Item 3']);
  });

  it('4. Should return an empty array for empty input', () => {
    const result = createListFromParagraph({ text: '' });
    expect(result).toEqual([]);
  });

  it('5. Should skip empty items', () => {
    const result = createListFromParagraph({ text: 'Item 1 \t  \t Item 3 \t ' });
    expect(result).toEqual(['1. Item 1', null, '3. Item 3']);
  });
});