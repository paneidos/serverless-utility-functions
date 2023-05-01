import filehash from "../../src/functions/filehash";

const callHash = async function(type: unknown, data: unknown) {
    return (await filehash.resolve({ params: [type, data] })).value;
};

describe('hash function', () => {
    it('works for sha256', async () => {
        const expected = 'b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c';
        const input = 'test/utils/test.txt';
        expect(await callHash('sha256', input)).toBe(expected);
    });

    it('works for sha384', async () => {
        const expected = '8effdabfe14416214a250f935505250bd991f106065d899db6e19bdc8bf648f3ac0f1935c4f65fe8f798289b1a0d1e06';
        const input = 'test/utils/test.txt';
        expect(await callHash('sha384', input)).toBe(expected);
    });

    it('throws on invalid type', async () => {
        await expect(callHash(null, 'foo')).rejects.toThrow();
    });

    it('throws on invalid data', async () => {
        await expect(callHash('sha256', null)).rejects.toThrow();
    });

    it('throws on non-existing files', async () => {
        await expect(callHash('sha256', 'test/utils/non-existent.txt')).rejects.toThrow();
    });
});
