export default {
    resolve({ params }: { params: unknown[] }) {
        if (typeof params[0] !== 'string') {
            throw new Error(`Expected resource name as argument to ref(), got ${params[0]}`);
        } else {
            return {value: {Ref: params[0]}};
        }
    }
};
