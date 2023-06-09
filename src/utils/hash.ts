import {createHash} from "crypto";
import {createReadStream} from "fs";
import globby from 'globby';

export function stringHash(type: string, data: string) {
    const hash = createHash(type);
    hash.update(data, 'utf-8');
    return hash.digest('hex');
}

export function fileHash(type: string, path: string): Promise<string|null> {
    return new Promise((resolve, reject) => {
        const hash = createHash(type);
        const stream = createReadStream(path);
        stream.on('error', error => {
            if('code' in error && error.code === 'ENOENT') {
                resolve(null);
            } else {
                reject(error)
            }
        });
        stream.on('data', chunk => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex')));
    });
}

export async function fileHashes(type: string, paths: string[]): Promise<[string, string|null][]> {
    return await Promise.all(paths.sort().map(async (path): Promise<[string, string|null]> => [path, await fileHash(type, path)]));
}

export async function globHash(type: string, glob: string): Promise<string|null> {
    const hashes = await fileHashes(type, await globby(glob));
    const actualHashes = hashes.filter(([path, digest]) => digest !== null);
    if (actualHashes.length === 0) {
        return null;
    }
    const content = actualHashes.map(([path, digest]) => `${digest}  ${path}\n`).join('');
    return stringHash(type, content);
}
