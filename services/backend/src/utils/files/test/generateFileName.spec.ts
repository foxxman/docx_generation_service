import { generateFileName } from "../generateFileName";

test('Generate file name', () => {
    expect(generateFileName({
        name: 'testfile',
        extension: 'txt',
    })).toMatch(/testfile_\d+\.txt/);
});

test('Generate file name without "name" property', () => {
    expect(generateFileName({
        extension: 'txt',
    })).toMatch(/\d+\.txt/);
});
