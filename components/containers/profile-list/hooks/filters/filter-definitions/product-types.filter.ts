import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import {
  ProductsBoolExp,
  ProductTypesBoolExp
} from '@/lib/graphql/generated/graphql';
import { siteConfig } from '@/lib/site-config';
import { isNotEmpty } from '@/lib/utils/is-not-empty';
import { parseAsArrayOf, useQueryState } from 'nuqs';
import { useFilter } from '../../use-filter';
import { FiltersStore } from '../../use-profile-filters';
import { mergeConditions, parseAsId, validateAndFormatOptions } from '../utils';

const filterId = 'productTypes';

export const useProductTypesFilter = (filterStore: FiltersStore) => {
  const [value, setValue] = useQueryState(
    filterId,
    parseAsArrayOf(parseAsId).withDefault([])
  );

  return useFilter<string, string>({
    id: filterId,
    type: 'multiselect',
    optionsQueryDeps: [filterStore],
    initialValue: value,
    onChange: newValue => setValue(newValue),
    getOptions: async () => {
      const data = await execute(
        graphql(`
          query getProductTypeOptions(
            $where: ProductTypesBoolExp
            $aggregateInput: ProductsFilterInput
          ) {
            productTypes(where: $where) {
              label: name
              value: id
              description: definition
              productsAggregate(filter_input: $aggregateInput) {
                _count
              }
            }
          }
        `),
        {
          where: buildProfileSectorsWhere(filterStore),
          aggregateInput: { where: buildAggregateInput(filterStore) }
        }
      );

      return validateAndFormatOptions(
        data?.productTypes
          ?.map(item => ({
            label: item.label,
            value: item.value,
            description: item.description,
            count: item?.productsAggregate?._count
          }))
          .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
      );
    },
    getQueryConditions: value => ({
      root: {
        products: {
          productTypeId: { _in: value }
        }
      }
    })
  });
};

function buildProfileSectorsWhere(
  filterStore: FiltersStore
): ProductTypesBoolExp {
  const conditions: ProductTypesBoolExp[] = [];

  if (
    isNotEmpty(filterStore.tagsFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.tags)
  ) {
    conditions.push({
      products: {
        root: {
          profileInfos: {
            root: {
              profileTags: {
                tagId: {
                  _in: [
                    ...filterStore.tagsFilter,
                    ...siteConfig.overrideFilterValues.tags
                  ]
                }
              }
            }
          }
        }
      }
    });
  }

  if (isNotEmpty(filterStore.profileSectorsFilter)) {
    conditions.push({
      products: {
        root: {
          profileInfos: {
            profileSectorId: {
              _in: filterStore.profileSectorsFilter
            }
          }
        }
      }
    });
  }

  if (
    isNotEmpty(filterStore.productAssetRelationshipsFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.productAssetRelationships)
  ) {
    conditions.push({
      products: {
        root: {
          profileInfos: {
            root: {
              products: {
                productAssetRelationships: {
                  asset: {
                    ticker: {
                      _in: siteConfig.overrideFilterValues
                        .productAssetRelationships
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  return mergeConditions(conditions);
}

function buildAggregateInput(filterStore: FiltersStore): ProductsBoolExp {
  const conditions: Array<ProductsBoolExp> = [];

  if (isNotEmpty(filterStore.tagsFilter)) {
    conditions.push({
      root: {
        profileTags: { tagId: { _in: filterStore.tagsFilter } }
      }
    });
  }

  if (isNotEmpty(filterStore.profileSectorsFilter)) {
    conditions.push({
      root: {
        products: {
          root: {
            profileInfos: {
              profileSectorId: {
                _in: filterStore.profileSectorsFilter
              }
            }
          }
        }
      }
    });
  }

  if (
    isNotEmpty(filterStore.productAssetRelationshipsFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.productAssetRelationships)
  ) {
    conditions.push({
      root: {
        products: {
          productAssetRelationships: {
            asset: {
              ticker: {
                _in: [
                  ...filterStore.productAssetRelationshipsFilter,
                  ...siteConfig.overrideFilterValues.productAssetRelationships
                ]
              }
            }
          }
        }
      }
    });
  }

  return mergeConditions(conditions);
}
