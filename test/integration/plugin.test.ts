import Serverless from "serverless";
const resolve = require("serverless/lib/configuration/variables/resolve");
const resolveMeta = require("serverless/lib/configuration/variables/resolve-meta");
import UtilityFunctionsPlugin from '../../src/index';

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
        // Fetch ref through the plugin
        const sls = buildSls();
        const plugin = sls.pluginManager.plugins[0] as UtilityFunctionsPlugin;
        const ref = plugin.configurationVariablesSources.ref
        // Try it out with several variables
        const configuration = {
            quotedString: "${ref('HttpApi')}",
            unquotedString: "${ref(HttpApi)}",
        };
        const variablesMeta = resolveMeta(configuration);
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

    it('provides hash()', async () => {
        // Fetch hash through the plugin
        const sls = buildSls();
        const plugin = sls.pluginManager.plugins[0] as UtilityFunctionsPlugin;
        const hash = plugin.configurationVariablesSources.hash
        // Try it out with several variables
        const configuration = {
            quotedString: "${hash(sha256, 'foo')}",
            unquotedString: "${hash(sha256, foo)}",
        };
        const variablesMeta = resolveMeta(configuration);
        await resolve({
            serviceDir: process.cwd(),
            configuration,
            variablesMeta,
            sources: { hash },
            options: {},
            fulfilledSources: new Set(['hash']),
        });
        expect(configuration.quotedString).toEqual('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');
        expect(configuration.unquotedString).toEqual('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');
    })

    it('provides filehash()', async () => {
        // Fetch filehash through the plugin
        const sls = buildSls();
        const plugin = sls.pluginManager.plugins[0] as UtilityFunctionsPlugin;
        const filehash = plugin.configurationVariablesSources.filehash
        // Try it out with several variables
        const configuration = {
            quotedString: "${filehash(sha256, 'test/utils/test.txt')}",
            unquotedString: "${filehash(sha256, test/utils/test.txt)}",
            nonExistent: "${filehash(sha256, test/utils/non-existent.txt), 'foo'}",
        };
        const variablesMeta = resolveMeta(configuration);
        await resolve({
            serviceDir: process.cwd(),
            configuration,
            variablesMeta,
            sources: { filehash },
            options: {},
            fulfilledSources: new Set(['filehash']),
        });
        expect(configuration.quotedString).toEqual('b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c');
        expect(configuration.unquotedString).toEqual('b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c');
        expect(configuration.nonExistent).toEqual('foo');
    })

    it('provides globhash()', async () => {
        // Fetch globhash through the plugin
        const sls = buildSls();
        const plugin = sls.pluginManager.plugins[0] as UtilityFunctionsPlugin;
        const globhash = plugin.configurationVariablesSources.globhash
        // Try it out with several variables
        const configuration = {
            quotedString: "${globhash(sha256, 'test/utils/tes*.txt')}",
            unquotedString: "${globhash(sha256, test/utils/tes*.txt)}",
            nonExistent: "${globhash(sha256, test/utils/*.nope), 'foo'}",
        };
        const variablesMeta = resolveMeta(configuration);
        await resolve({
            serviceDir: process.cwd(),
            configuration,
            variablesMeta,
            sources: { globhash },
            options: {},
            fulfilledSources: new Set(['globhash']),
        });
        expect(configuration.quotedString).toEqual('126b9412abedfd5cf1858d6dae571e46b68d298b35934489bb2ccb432ef9ae80');
        expect(configuration.unquotedString).toEqual('126b9412abedfd5cf1858d6dae571e46b68d298b35934489bb2ccb432ef9ae80');
        expect(configuration.nonExistent).toEqual('foo');
    })
})
