import ref from './ref';

const callRef = function(...params: unknown[]) {
    return ref.resolve({ params }).value;
};

describe('ref()', () => {
    it('returns an object', () => {
        expect(callRef('HttpApi')).toEqual({Ref: 'HttpApi'});
    });

    it('fails on non-string input', () => {
        expect(() => callRef(null)).toThrow();
    });
});
