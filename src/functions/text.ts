import {readFile} from 'fs/promises';
import {ResolveParameter, ResolveResult} from "./types";

async function resolveTextConditional(
    condition: unknown,
    invertCondition: boolean,
    file: string,
    address: string|undefined,
    resolveVariable: (spec: string) => Promise<unknown>
): Promise<ResolveResult> {
    if (typeof condition === 'string') {
        condition = await resolveVariable(`strToBool('${condition}')`);
    }
    if (typeof condition !== 'boolean' && condition !== null) {
        throw new Error(`First argument should represent a boolean, not ${typeof condition}`);
    }
    if (invertCondition) {
        condition = !condition;
    }
    if (condition) {
        const newAddress = `text(${file})${address ? ':' + address : ''}`;
        const value = await resolveVariable(newAddress);
        return { value };
    } else {
        return { value: null };
    }
}

export const textIf = {
    async resolve({ params: [condition, file], address, resolveVariable }: ResolveParameter<[unknown, string]>): Promise<ResolveResult> {
        return await resolveTextConditional(condition, false, file, address, resolveVariable);
    }
}
export const textUnless = {
    async resolve({ params: [condition, file], address, resolveVariable }: ResolveParameter<[unknown, string]>): Promise<ResolveResult> {
        return await resolveTextConditional(condition, true, file, address, resolveVariable);
    }
}

export const text = {
    async resolve({ params: [file] }: ResolveParameter<[string]>): Promise<ResolveResult> {
        try {
            const contents = await readFile(file);
            return {value: contents.toString()};
        } catch (error) {
            return { value: null };
        }
    }
}
