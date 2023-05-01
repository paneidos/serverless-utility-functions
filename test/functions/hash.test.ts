import hash from "../../src/functions/hash";

const callHash = function(type: unknown, data: unknown) {
    return hash.resolve({ params: [type, data] }).value;
};

describe('hash function', () => {
    it('works for sha256', () => {
        const expected = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
        const input = 'foo';
        expect(callHash('sha256', input)).toBe(expected);
    });

    it('works for sha384', () => {
        const expected = '98c11ffdfdd540676b1a137cb1a22b2a70350c9a44171d6b1180c6be5cbb2ee3f79d532c8a1dd9ef2e8e08e752a3babb';
        const input = 'foo';
        expect(callHash('sha384', input)).toBe(expected);
    });

    it('throws on invalid type', () => {
        expect(() => callHash(null, 'foo')).toThrow();
    });

    it('throws on invalid data', () => {
        expect(() => callHash('sha256', null)).toThrow();
    });
});
