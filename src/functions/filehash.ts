import {fileHash} from "../utils/hash";

export default {
    async resolve({ params: [type, data ] }: { params: unknown[] }) {
        if (typeof type !== 'string') {
            throw new Error(`Expected hash type as first argument to hash(), got ${type}`);
        }
        if (typeof data !== 'string') {
            throw new Error(`Expected path string as second argument to hash(), got ${typeof data}`);
        }
        return {value: fileHash(type, data)};
    }
};
