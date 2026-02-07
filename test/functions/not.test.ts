import not from '../../src/functions/not';

const callNot = async function(...params: unknown[]) {
    return (await not.resolve({ params, resolveVariable: () => { throw new Error('not available') } })).value;
};

describe('ref()', () => {
    it('returns an the opposite', async () => {
        expect(await callNot(true)).toEqual(false);
        expect(await callNot(false)).toEqual(true);
    });

    it('fails on non-boolean input', async () => {
        await expect(async () => await callNot(0)).rejects.toThrowError();
    });
});
