// Policy names exactly match documentation
const CachePolicy = {
    Amplify: '2e54312d-136d-493c-8eb9-b001f22f67d2',
    CachingDisabled: '4135ea2d-6df8-44a3-9df3-4b5a84be39ad',
    CachingOptimized: '658327ea-f89d-4fab-a63d-7e88639e58f6',
    CachingOptimizedForUncompressedObjects: 'b2884449-e4de-46a7-ac36-70bc7f1ddd6d',
    'Elemental-MediaPackage': '08627262-05a9-4f76-9ded-b50ca2e3a84f',
    UseOriginCacheControlHeaders: '83da9c7e-98b4-4e11-a168-04f0df8e2c65',
    'UseOriginCacheControlHeaders-QueryStrings': '4cc15a8a-d715-48a4-82b8-cc0b614638fe',
}
const OriginRequestPolicy = {
    AllViewer: '216adef6-5c7f-47e4-b989-5492eafa07d3',
    'AllViewerAndCloudFrontHeaders-2022-06': '33f36d7e-f396-46d9-90e0-52428a34d9dc',
    AllViewerExceptHostHeader: 'b689b0a8-53d0-40ab-baf2-68738e2966ac',
    'CORS-CustomOrigin': '59781a5b-3903-41f3-afcb-af62929ccde1',
    'CORS-S3Origin': '88a5eaf4-2fd4-4709-b370-b4c650ea3fcf',
    'Elemental-MediaTailor-PersonalizedManifests': '775133bc-15f2-49f9-abea-afb2e0bf67d2',
    'UserAgentRefererHeaders': 'acba4595-bd28-49b8-b9fe-13317c0390fa',
}
const ResponseHeaderPolicy = {
    'CORS-and-SecurityHeadersPolicy': 'e61eb60c-9c35-4d20-a928-2b84e02af89c',
    'CORS-With-Preflight': '5cc3b908-e619-4b99-88e5-2cf7f45965bd',
    'CORS-with-preflight-and-SecurityHeadersPolicy': 'eaab4381-ed33-4a86-88ca-d9558dc6cd63',
    'SecurityHeadersPolicy': '67f7725c-6f97-4210-82d7-5512b31e9d03',
    'SimpleCORS': '60669652-455b-4ae9-85a4-c4c02393f86c',
}
const HostedZone = {
    CloudFront: 'Z2FDTNDATAQYW2',
    GlobalAccelerator: 'Z2BJ6XQ5FK7U4H',
}
export const IDTable: Record<string, Record<string, string>> = {
    HostedZone,
    ResponseHeaderPolicy,
    OriginRequestPolicy,
    CachePolicy,
}
