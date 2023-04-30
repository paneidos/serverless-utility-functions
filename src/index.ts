import Serverless from "serverless";
import Plugin from "serverless/classes/Plugin";

class MoreVariablesPlugin implements Plugin {
    commands: Plugin.Commands | undefined;
    hooks: Plugin.Hooks;
    variableResolvers: Plugin.VariableResolvers | undefined;
    serverless: Serverless
    configurationVariablesSources: any

    constructor(serverless: Serverless, options: Serverless.Options, { log }: Plugin.Logging) {
        this.serverless = serverless;
        this.hooks = {};
        this.configurationVariablesSources = {
            ref: {
                resolve({ params }: { params: unknown[] }) {
                    if (typeof params[0] !== 'string') {
                        log.error('Expected resource name as argument to ref()');
                    } else {
                        return {value: {Ref: params[0]}};
                    }
                }
            }
        }
    }
}

export = MoreVariablesPlugin;
