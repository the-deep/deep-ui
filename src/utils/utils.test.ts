import {
    isValidUrl,
} from './index';

test('Is valid URL', () => {
    expect(isValidUrl('https://wikipedia.org')).toBe(true);
    expect(isValidUrl(undefined)).toBe(false);
    expect(isValidUrl('/asd/a1jkn/')).toBe(false);
    expect(isValidUrl('mailto:someone@example.com')).toBe(true);
    expect(isValidUrl('http://localhost:3900')).toBe(true);
});
