export type ResolveParameter<P = unknown[]> = {
    params: P
    address: string | undefined;
    resolveVariable: (spec: string) => Promise<unknown>;
}
export type ResolveResult = {
    value: unknown
}
