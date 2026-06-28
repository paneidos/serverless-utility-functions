export default {
    async resolve({ params: [value], resolveVariable }: { params: unknown[],
        resolveVariable: (spec: string) => Promise<unknown> }) {
        // False will get passed as null, so we want to treat null as false and invert it to true
        if (value === null) {
            return { value: true };
        }
        if (typeof value !== 'boolean') {
            throw new Error(`Expected a boolean argument to not(), got ${typeof value}`);
        }
        return {value: !value};
    }
};
