type ResolveResult = {
    value: unknown
}
type ResolveParameter<P = unknown[]> = {
    params: P
    address: string|undefined;
    resolveVariable: (spec: string) => Promise<unknown>;
}

async function resolveFileConditional(
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
        const newAddress = `file(${file})${address ? ':' + address : ''}`;
        const value = await resolveVariable(newAddress);
        return { value };
    } else if (address) {
        return { value: null };
    } else {
        return { value: {} };
    }
}

export const fileIf = {
    async resolve({ params: [condition, file], address, resolveVariable }: ResolveParameter<[unknown, string]>): Promise<ResolveResult> {
        return await resolveFileConditional(condition, false, file, address, resolveVariable);
    }
}
export const fileUnless = {
    async resolve({ params: [condition, file], address, resolveVariable }: ResolveParameter<[unknown, string]>): Promise<ResolveResult> {
        return await resolveFileConditional(condition, true, file, address, resolveVariable);
    }
}
