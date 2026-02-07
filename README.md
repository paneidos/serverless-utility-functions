# Serverless Utility Functions

This package several utility functions to Serverless.

It provides the following generic functions:
- `not`: Negates a boolean value.
- `hash`: Calculate the hash of a string.
- `filehash`: Calculate the hash of a file.
- `globhash`: Calculate the hash of multiple files.
- `fileIf`/`fileUnless`: Conditionally include a file based on a boolean value.

In addition, it provides the following CloudFormation-specific functions:
- `ref`: Create a ref value for a resource. Useful for chaining with other functions.
- `awsId`: Reference special AWS ids by name, such as CloudFront cache policies or Route53 hosted zones.

## Generic functions

### not(value)

Negates the provided boolean value.

### hash(type, string)

Calculate the hash of the specified type for the specified string.
Supports any hash that works with the builtin crypto module.

Example usage:

```yaml
custom:
  hash: ${hash(sha256, 'your-string')} 
```

### filehash(type, path)

Calculate the hash of the specified type for the specified file.
Supports any hash that works with the builtin crypto module.
Non-existing files result in a null value, which allows chaining.

Example usage:

```yaml
custom:
  lastDeployedFrontend: ${filehash(sha256, public/manifest.json)}
```

### globhash(type, glob)

Calculate the hash of the specified type for the specified files.
Supports any hash that works with the builtin crypto module.
If the glob results in an empty set, this will result in a null value, which allows chaining.

Example usage:

```yaml
custom:
  migrationVersion: ${globhash(sha256, migrations/*)} 
```

### fileIf(condition, file) & fileUnless(condition, file)

Both functions take a condition that will be passed to strToBool if it's a string.
If the condition check passes, the builtin file function will be invoked with the specified file and optional address.
If the condition check doesn't pass, an empty object is returned or null in case an address was given.

Example usage:
```yaml
functions:
  - ${fileIf(${param:debug}, functions/debug.yml)}

provider:
  runtime: ${fileIf(${param:experimental}, variables.yml):NEW_RUNTIME, 'python3.9'}
```


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

### awsId(type, name)
Reference special ids used for AWS by name.
Supported types:

- [CachePolicy](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html)
- [OriginRequestPolicy](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html)
- [ResponseHeaderPolicy](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-response-headers-policies.html)
- [HostedZone](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53-recordset-aliastarget.html)

Example usage:

```yaml
resources:
  CloudFront:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        DefaultCacheBehavior:
          CachePolicyId: ${awsId(CachePolicy):CachingDisabled}
```
