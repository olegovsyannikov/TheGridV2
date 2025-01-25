/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  '\n  fragment AssetFieldsFragment on AAssets {\n    ticker\n    rootId\n    name\n    id\n    icon\n    description\n    assetTypeId\n    assetStatusId\n    assetType {\n      definition\n      id\n      name\n    }\n    assetStatus {\n      name\n      id\n      definition\n    }\n    assetDeployments {\n      id\n      deploymentId\n      assetId\n      smartContractDeployment {\n        id\n        deployedOnProduct {\n          id\n          name\n          root {\n            slug\n          }\n        }\n        assetStandard {\n          id\n        }\n        smartContracts {\n          name\n          id\n          deploymentId\n          deploymentDate\n          address\n        }\n        deploymentType {\n          name\n          id\n          definition\n        }\n      }\n    }\n    urls(order_by: { urlTypeId: Asc }) {\n      url\n      urlType {\n        name\n        id\n        definition\n      }\n    }\n  }\n':
    types.AssetFieldsFragmentFragmentDoc,
  '\n  fragment EntityFieldsFragment on AEntities {\n    name\n    tradeName\n    taxIdentificationNumber\n    localRegistrationNumber\n    leiNumber\n    id\n    dateOfIncorporation\n    address\n    entityType {\n      name\n      id\n      definition\n    }\n    country {\n      name\n      id\n      code\n    }\n    urls {\n      url\n      urlType {\n        name\n        id\n        definition\n      }\n    }\n  }\n':
    types.EntityFieldsFragmentFragmentDoc,
  '\n  fragment ProfileFragment on AProfileInfos {\n    profileSector {\n      name\n    }\n    profileType {\n      name\n    }\n    root {\n      assets {\n        ticker\n      }\n    }\n    profileStatus {\n      name\n      id\n    }\n    root {\n      profileTags {\n        tag {\n          name\n          id\n        }\n      }\n    }\n    mainProduct: root {\n      products(where: { isMainProduct: { _eq: "1" } }, limit: 1) {\n        productType {\n          name\n        }\n      }\n    }\n  }\n':
    types.ProfileFragmentFragmentDoc,
  '\n  fragment ProductFieldsFragment on AProducts {\n    rootId\n    productTypeId\n    productStatusId\n    name\n    launchDate\n    isMainProduct\n    id\n    description\n    productType {\n      name\n      id\n      definition\n    }\n    productStatus {\n      name\n      id\n      definition\n    }\n    productDeployments {\n      smartContractDeployment {\n        deployedOnProduct {\n          id\n          name\n          root {\n            slug\n          }\n        }\n        assetStandard {\n          id\n        }\n        deploymentType {\n          name\n        }\n        smartContracts {\n          name\n          id\n          deploymentDate\n          address\n          deploymentId\n        }\n        isOfStandardId\n        id\n      }\n    }\n    supportsProducts {\n      supportsProduct {\n        name\n        id\n        root {\n          slug\n        }\n      }\n    }\n    urls(order_by: { urlTypeId: Asc }) {\n      url\n      urlType {\n        name\n        id\n        definition\n      }\n    }\n    productAssetRelationships {\n      assetId\n      asset {\n        name\n        id\n        assetType {\n          name\n        }\n        root {\n          slug\n        }\n      }\n      assetSupportType {\n        name\n      }\n      product {\n        name\n        id\n        description\n      }\n    }\n  }\n':
    types.ProductFieldsFragmentFragmentDoc,
  '\n  fragment ProfileHeadingFragment on AProfileInfos {\n    logo\n    name\n    urls(order_by: { urlTypeId: Asc }) {\n      url\n      urlType {\n        name\n      }\n    }\n    root {\n      socials {\n        name\n        socialType {\n          name\n        }\n        urls(order_by: { urlTypeId: Asc }) {\n          url\n        }\n      }\n    }\n  }\n':
    types.ProfileHeadingFragmentFragmentDoc,
  '\n  query getProfileData($where: AProfileInfosBoolExp) {\n    profileInfos(limit: 1, offset: 0, where: $where) {\n      tagLine\n      descriptionShort\n      descriptionLong\n      ...ProfileHeadingFragment\n      ...ProfileFragment\n      root {\n        products {\n          id\n          ...ProductFieldsFragment\n        }\n        assets {\n          id\n          ...AssetFieldsFragment\n        }\n        entities {\n          id\n          ...EntityFieldsFragment\n        }\n      }\n    }\n  }\n':
    types.GetProfileDataDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AssetFieldsFragment on AAssets {\n    ticker\n    rootId\n    name\n    id\n    icon\n    description\n    assetTypeId\n    assetStatusId\n    assetType {\n      definition\n      id\n      name\n    }\n    assetStatus {\n      name\n      id\n      definition\n    }\n    assetDeployments {\n      id\n      deploymentId\n      assetId\n      smartContractDeployment {\n        id\n        deployedOnProduct {\n          id\n          name\n          root {\n            slug\n          }\n        }\n        assetStandard {\n          id\n        }\n        smartContracts {\n          name\n          id\n          deploymentId\n          deploymentDate\n          address\n        }\n        deploymentType {\n          name\n          id\n          definition\n        }\n      }\n    }\n    urls(order_by: { urlTypeId: Asc }) {\n      url\n      urlType {\n        name\n        id\n        definition\n      }\n    }\n  }\n'
): typeof import('./graphql').AssetFieldsFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment EntityFieldsFragment on AEntities {\n    name\n    tradeName\n    taxIdentificationNumber\n    localRegistrationNumber\n    leiNumber\n    id\n    dateOfIncorporation\n    address\n    entityType {\n      name\n      id\n      definition\n    }\n    country {\n      name\n      id\n      code\n    }\n    urls {\n      url\n      urlType {\n        name\n        id\n        definition\n      }\n    }\n  }\n'
): typeof import('./graphql').EntityFieldsFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ProfileFragment on AProfileInfos {\n    profileSector {\n      name\n    }\n    profileType {\n      name\n    }\n    root {\n      assets {\n        ticker\n      }\n    }\n    profileStatus {\n      name\n      id\n    }\n    root {\n      profileTags {\n        tag {\n          name\n          id\n        }\n      }\n    }\n    mainProduct: root {\n      products(where: { isMainProduct: { _eq: "1" } }, limit: 1) {\n        productType {\n          name\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ProfileFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ProductFieldsFragment on AProducts {\n    rootId\n    productTypeId\n    productStatusId\n    name\n    launchDate\n    isMainProduct\n    id\n    description\n    productType {\n      name\n      id\n      definition\n    }\n    productStatus {\n      name\n      id\n      definition\n    }\n    productDeployments {\n      smartContractDeployment {\n        deployedOnProduct {\n          id\n          name\n          root {\n            slug\n          }\n        }\n        assetStandard {\n          id\n        }\n        deploymentType {\n          name\n        }\n        smartContracts {\n          name\n          id\n          deploymentDate\n          address\n          deploymentId\n        }\n        isOfStandardId\n        id\n      }\n    }\n    supportsProducts {\n      supportsProduct {\n        name\n        id\n        root {\n          slug\n        }\n      }\n    }\n    urls(order_by: { urlTypeId: Asc }) {\n      url\n      urlType {\n        name\n        id\n        definition\n      }\n    }\n    productAssetRelationships {\n      assetId\n      asset {\n        name\n        id\n        assetType {\n          name\n        }\n        root {\n          slug\n        }\n      }\n      assetSupportType {\n        name\n      }\n      product {\n        name\n        id\n        description\n      }\n    }\n  }\n'
): typeof import('./graphql').ProductFieldsFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ProfileHeadingFragment on AProfileInfos {\n    logo\n    name\n    urls(order_by: { urlTypeId: Asc }) {\n      url\n      urlType {\n        name\n      }\n    }\n    root {\n      socials {\n        name\n        socialType {\n          name\n        }\n        urls(order_by: { urlTypeId: Asc }) {\n          url\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ProfileHeadingFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getProfileData($where: AProfileInfosBoolExp) {\n    profileInfos(limit: 1, offset: 0, where: $where) {\n      tagLine\n      descriptionShort\n      descriptionLong\n      ...ProfileHeadingFragment\n      ...ProfileFragment\n      root {\n        products {\n          id\n          ...ProductFieldsFragment\n        }\n        assets {\n          id\n          ...AssetFieldsFragment\n        }\n        entities {\n          id\n          ...EntityFieldsFragment\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').GetProfileDataDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
