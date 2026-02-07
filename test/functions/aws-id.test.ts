import awsId from '../../src/functions/aws-id';
import {IDTable} from "../../src/data/aws-id";

const callAws = function(table: string, address: string) {
    return awsId.resolve({ params: [table], address }).value;
};

describe('ref()', () => {
    it('returns the value from the table', () => {
        expect(callAws('HostedZone', 'CloudFront')).toEqual(IDTable.HostedZone.CloudFront);
    });

    it('throws on unknown type', () => {
        expect(() => callAws('UnknownType', 'CloudFront')).toThrowError('Unknown type: UnknownType');
    })

    it('throws on unknown value', () => {
        expect(() => callAws('HostedZone', 'UnknownValue')).toThrowError('Unknown value: UnknownValue');
    })
});
