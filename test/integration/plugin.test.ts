import Serverless from "serverless";
import MoreVariablesPlugin from '../../src/index';

function buildSls() {
    const sls = new Serverless({
        commands: [],
        options: {}
    });
    sls.pluginManager.addPlugin(MoreVariablesPlugin);
    return sls;
}

describe('MoreVariablesPlugin', () => {
    it('installs', () => {
        expect(buildSls()).not.toBeNull();
    })
})
