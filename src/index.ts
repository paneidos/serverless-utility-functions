import Serverless from "serverless";
import Plugin from "serverless/classes/Plugin";
import ref from "./functions/ref";

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
            ref,
        }
    }
}

export = MoreVariablesPlugin;
