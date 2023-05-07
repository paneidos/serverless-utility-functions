import {globHash} from "../utils/hash";

export default {
    async resolve({ params: [type, data ] }: { params: unknown[] }) {
        if (typeof type !== 'string') {
            throw new Error(`Expected hash type as first argument to hash(), got ${type}`);
        }
        if (typeof data !== 'string') {
            throw new Error(`Expected glob string as second argument to hash(), got ${typeof data}`);
        }
        const value = await globHash(type, data);
        return {value };
    }
};
