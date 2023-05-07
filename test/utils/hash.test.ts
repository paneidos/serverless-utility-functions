import {fileHash, globHash, stringHash} from "../../src/utils/hash";

describe('stringHash', () => {
    it('calculates sha256', () => {
        expect(stringHash('sha256', 'foo')).toBe('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');
    });
});

describe('fileHash', () => {
    it('calculates sha256', async () => {
        const hash = await fileHash('sha256', 'test/utils/test.txt');
        expect(hash).toBe('b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c');
    });

    it('returns null for non-existent files', async () => {
        const hash = await fileHash('sha256', __dirname + '/non-existent.txt');
        expect(hash).toBeNull();
    });
})

describe('globHash', () => {
    it('calculates sha256', async () => {
        const hash = await globHash('sha256', 'test/utils/*.txt');
        expect(hash).toBe('126b9412abedfd5cf1858d6dae571e46b68d298b35934489bb2ccb432ef9ae80');
    });
})
