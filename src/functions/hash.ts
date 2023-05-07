import {stringHash} from "../utils/hash";

export default {
    resolve({ params: [type, data ] }: { params: unknown[] }) {
        if (typeof type !== 'string') {
            throw new Error(`Expected hash type as first argument to hash(), got ${type}`);
        }
        if (typeof data !== 'string') {
            throw new Error(`Expected content string as second argument to hash(), got ${typeof data}`);
        }
        return {value: stringHash(type, data)};
    }
};
