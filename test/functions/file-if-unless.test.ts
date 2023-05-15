import {fileIf, fileUnless} from '../../src/functions/file-if-unless';


describe('fileIf', () => {
    describe('validation', () => {
        it('throws errors', async () => {
            await expect(fileIf.resolve({
                params: [{}, 'file'],
                address: undefined,
                resolveVariable: async () => true
            })).rejects.toThrow();
        })

        it('works with string version of  false', async () => {
            const result = await fileIf.resolve({
                params: ['false', 'file'],
                address: undefined,
                resolveVariable: async () => false
            });
            expect(result.value).toEqual({});
        })

        it('works with string version of true', async () => {
            const result = await fileIf.resolve({
                params: ['true', 'file'],
                address: undefined,
                resolveVariable: async () => true
            });
            expect(result.value).toEqual(true);
        })
    });

    describe('without address', () => {
        it('returns empty object on false', async () => {
            const result = await fileIf.resolve({
                params: [false, 'file'],
                address: undefined,
                resolveVariable: async () => false
            });
            expect(result.value).toEqual({});
        })

        it('returns the resolved value on true', async () => {
            const result = await fileIf.resolve({
                params: [true, 'file'],
                address: undefined,
                resolveVariable: async () => ({foo: 'bar'})
            });
            expect(result.value).toEqual({foo: 'bar'});
        })
    })

    describe('with address', () => {
        it('returns null on false', async () => {
            const result = await fileIf.resolve({
                params: [false, 'file'],
                address: 'address',
                resolveVariable: async () => false
            });
            expect(result.value).toBeNull();
        })

        it('returns the resolved value on true', async () => {
            const result = await fileIf.resolve({
                params: [true, 'file'],
                address: 'address',
                resolveVariable: async () => ({foo: 'bar'})
            });
            expect(result.value).toEqual({foo: 'bar'});
        })
    });
});

describe('fileUnless', () => {
    describe('without address', () => {
        it('returns empty object on true', async () => {
            const result = await fileUnless.resolve({
                params: [true, 'file'],
                address: undefined,
                resolveVariable: async () => false
            });
            expect(result.value).toEqual({});
        })

        it('returns the resolved value on false', async () => {
            const result = await fileUnless.resolve({
                params: [false, 'file'],
                address: undefined,
                resolveVariable: async () => ({foo: 'bar'})
            });
            expect(result.value).toEqual({foo: 'bar'});
        })
    })

    describe('with address', () => {
        it('returns null on true', async () => {
            const result = await fileUnless.resolve({
                params: [true, 'file'],
                address: 'address',
                resolveVariable: async () => false
            });
            expect(result.value).toBeNull();
        })

        it('returns the resolved value on false', async () => {
            const result = await fileUnless.resolve({
                params: [false, 'file'],
                address: 'address',
                resolveVariable: async () => ({foo: 'bar'})
            });
            expect(result.value).toEqual({foo: 'bar'});
        })
    });
});
