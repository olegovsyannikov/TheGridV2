import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import { ProductsBoolExp } from '@/lib/graphql/generated/graphql';
import { siteConfig } from '@/lib/site-config';
import { isNotEmpty } from '@/lib/utils/is-not-empty';
import { parseAsArrayOf, useQueryState } from 'nuqs';
import { useFilter } from '../../use-filter';
import { FiltersStore } from '../../use-profile-filters';
import { mergeConditions, parseAsId, validateAndFormatOptions } from '../utils';

const filterId = 'productDeployedOn';

export const useProductDeployedOnFilter = (filterStore: FiltersStore) => {
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
          query getProductDeployedOnProductsOptions($where: ProductsBoolExp) {
            products(where: $where) {
              name
              id
              description
            }
          }
        `),
        {
          where: buildDeployedOnProductsWhere(filterStore)
        }
      );

      const options = data?.products?.map(item => ({
        label: item.name,
        value: item.id,
        description: item.description
      }));

      return validateAndFormatOptions(options);
    },
    getQueryConditions: value => ({
      root: {
        products: {
          productDeployments: {
            smartContractDeployment: {
              deployedOnId: { _in: value }
            }
          }
        }
      }
    })
  });
};

function buildDeployedOnProductsWhere(
  filterStore: FiltersStore
): ProductsBoolExp {
  const conditions: ProductsBoolExp[] = [];

  if (isNotEmpty(siteConfig.overrideFilterValues.productDeployedOn)) {
    conditions.push({
      root: {
        products: {
          productDeployments: {
            smartContractDeployment: {
              deployedOnId: {
                _in: siteConfig.overrideFilterValues.productDeployedOn
              }
            }
          }
        }
      }
    });
  }

  if (isNotEmpty(siteConfig.overrideOptionsFilterValues.productTypes)) {
    conditions.push({
      _or: [
        {
          root: {
            products: {
              productTypeId: {
                _in: siteConfig.overrideOptionsFilterValues.productTypes
              }
            }
          }
        }
      ]
    });
  }

  return mergeConditions(conditions);
}
