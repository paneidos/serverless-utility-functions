import ref from './ref';

const callRef = function(...params: string[]) {
    return ref.resolve({ params }).value;
};

test('ref() returns object', () => {
    expect(callRef('HttpApi')).toEqual({Ref: 'HttpApi'});
});
