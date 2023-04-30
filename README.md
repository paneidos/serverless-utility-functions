# Serverless Utility Functions

This package several utility functions to Serverless.

## CloudFormation Functions

### ref(resource)

This function returns the provided resource wrapped in a Ref-object.
This makes specifying a Ref more convenient in the context of variable chains.

Example usages:

```yaml
provider:
  environment:
    BUCKET: ${env:BUCKET, ref(DataBucket)}
    DYNAMO_DB_TABLE: ${cf:${provider.stackName}.Table, ref(Table)}
    SECRET: ${ref(Secret)}
```
