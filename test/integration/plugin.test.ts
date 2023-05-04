import Serverless from "serverless";
const resolve = require("serverless/lib/configuration/variables/resolve");
const resolveMeta = require("serverless/lib/configuration/variables/resolve-meta");
import UtilityFunctionsPlugin from '../../src/index';
import ref from '../../src/functions/ref';

function buildSls(): Serverless {
    const sls = new Serverless({
        commands: [],
        options: {}
    });
    sls.pluginManager.addPlugin(UtilityFunctionsPlugin);
    return sls;
}

describe('UtilityFunctionsPlugin', () => {
    it('installs', () => {
        expect(buildSls()).not.toBeNull();
    })

    it('provides ref()', async () => {
        let variablesMeta;
        let configuration = {
            quotedString: "${ref('HttpApi')}",
            unquotedString: "${ref(HttpApi)}",
        };
        variablesMeta = resolveMeta(configuration);
        await resolve({
            serviceDir: process.cwd(),
            configuration,
            variablesMeta,
            sources: { ref },
            options: {},
            fulfilledSources: new Set(['ref']),
        });
        expect(configuration.quotedString).toEqual({ Ref: 'HttpApi'});
        expect(configuration.unquotedString).toEqual({ Ref: 'HttpApi'});
    })
})
