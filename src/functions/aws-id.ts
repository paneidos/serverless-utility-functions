import {IDTable} from "../data/aws-id";

export default {
    resolve({params: [type], address: name}: { params: [string], address: string }) {
        const table = IDTable[type]
        if (table === undefined) {
            throw new Error(`Unknown type: ${type}`)
        }
        const value = table[name]

        if (value === undefined) {
            throw new Error(`Unknown value: ${name}`)
        }

        return {value}
    }
}
