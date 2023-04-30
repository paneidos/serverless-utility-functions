import { createHash } from "crypto";

function digest(type: string, data: string): string {
    const hash = createHash(type);
    hash.update(data, 'utf-8');
    return hash.digest('hex');
}

export default {
    resolve({ params: [type, data ] }: { params: unknown[] }) {
        if (typeof type !== 'string') {
            throw new Error(`Expected hash type as first argument to hash(), got ${type}`);
        }
        if (typeof data !== 'string') {
            throw new Error(`Expected content string as second argument to hash(), got ${typeof data}`);
        }
        return {value: digest(type, data)};
    }
};
