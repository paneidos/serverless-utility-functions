import {text, textIf, textUnless} from '../../src/functions/text';
import * as path from "node:path";

describe('text', () => {
    it('reads an existing file', async () => {
        const result = await text.resolve({
            params: [path.resolve(__dirname, '../utils/test.txt')],
            address: undefined,
            resolveVariable: async () => true
        });
        expect(result.value).toEqual("foo\n");
    })
})

describe('textIf', () => {
    describe('validation', () => {
        it('throws errors', async () => {
            await expect(textIf.resolve({
                params: [{}, 'file'],
                address: undefined,
                resolveVariable: async () => true
            })).rejects.toThrow();
        })

        it('works with string version of false', async () => {
            const result = await textIf.resolve({
                params: ['false', 'file'],
                address: undefined,
                resolveVariable: async () => false
            });
            expect(result.value).toEqual(null);
        })

        it('works with string version of true', async () => {
            const result = await textIf.resolve({
                params: ['true', 'file'],
                address: undefined,
                resolveVariable: async (spec) => {
                    if (spec.startsWith('strToBool')) {
                        return true
                    } else if (spec.startsWith('text')) {
                        return 'foo'
                    }
                }
            });
            expect(result.value).toEqual('foo');
        })
    });

    describe('resolving', () => {
        it('returns null on false', async () => {
            const result = await textIf.resolve({
                params: [false, 'file'],
                address: undefined,
                resolveVariable: async () => false
            });
            expect(result.value).toEqual(null);
        })

        it('returns the resolved value on true', async () => {
            const result = await textIf.resolve({
                params: [true, 'file'],
                address: undefined,
                resolveVariable: async () => ('foo')
            });
            expect(result.value).toEqual('foo');
        })
    })
});

describe('textUnless', () => {
    describe('resolving', () => {
        it('returns empty object on true', async () => {
            const result = await textUnless.resolve({
                params: [true, 'file'],
                address: undefined,
                resolveVariable: async () => false
            });
            expect(result.value).toEqual(null);
        })

        it('returns the resolved value on false', async () => {
            const result = await textUnless.resolve({
                params: [false, 'file'],
                address: undefined,
                resolveVariable: async () => ('foo')
            });
            expect(result.value).toEqual('foo');
        })
    })
});
