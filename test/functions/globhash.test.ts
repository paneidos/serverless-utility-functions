import globhash from "../../src/functions/globhash";

const callHash = async function(type: unknown, data: unknown) {
    return (await globhash.resolve({ params: [type, data] })).value;
};

describe('hash function', () => {
    it('works for sha256', async () => {
        const expected = '126b9412abedfd5cf1858d6dae571e46b68d298b35934489bb2ccb432ef9ae80';
        const input = 'test/utils/*.txt';
        expect(await callHash('sha256', input)).toBe(expected);
    });

    it('works for sha384', async () => {
        const expected = '221e5961e2527f2b8f3a75d03fb61d93ce0ad3d7e7832178becdc6466c85b442f4d4c07412d675c8def7def69c235283';
        const input = 'test/utils/*.txt';
        expect(await callHash('sha384', input)).toBe(expected);
    });

    it('throws on invalid type', async () => {
        await expect(callHash(null, 'foo')).rejects.toThrow();
    });

    it('throws on invalid data', async () => {
        await expect(callHash('sha256', null)).rejects.toThrow();
    });

    it('returns null', async () => {
        const hash = await callHash('sha256', 'test/utils/non-existent.*');
        expect(hash).toBeNull();
    });
});
