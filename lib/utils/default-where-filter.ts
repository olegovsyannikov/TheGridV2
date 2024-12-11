import { siteConfig } from '@/lib/site-config';
import {
  SearchProfilesQueryVariables,
  CProfileInfosBoolExp
} from '@/lib/graphql/generated-graphql';

const getDefaultWhereFilter = (): CProfileInfosBoolExp => {
  const orConditions: CProfileInfosBoolExp[] = [];

  if (siteConfig.filterByProductIds?.length) {
    orConditions.push(
      {
        root: {
          products: {
            supportsProductsBySupportsProductId: {
              productId: {
                _in: siteConfig.filterByProductIds
              }
            }
          }
        }
      },
      {
        root: {
          products: {
            productDeployments: {
              deploymentId: {
                _in: siteConfig.filterByProductIds
              }
            }
          }
        }
      },
      {
        root: {
          products: {
            id: {
              _in: siteConfig.filterByProductIds
            }
          }
        }
      },
      {
        root: {
          assets: {
            assetDeployments: {
              smartContractDeployment: {
                deployedOnId: {
                  _in: siteConfig.filterByProductIds
                }
              }
            }
          }
        }
      }
    );
  }

  if (siteConfig.tags?.length) {
    orConditions.push({
      root: {
        profileTags: {
          tagId: {
            _in: siteConfig.tags
          }
        }
      }
    });
  }

  return orConditions.length ? { _or: orConditions } : {};
};

export const withDefaultWhereFilter = (
  where: SearchProfilesQueryVariables['where'] = {}
) => {
  const defaultFilter = getDefaultWhereFilter();
  return Object.keys(defaultFilter).length
    ? { ...where, ...defaultFilter }
    : where;
};
