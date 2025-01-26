import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import { SupportsProductsBoolExp } from '@/lib/graphql/generated/graphql';
import { siteConfig } from '@/lib/site-config';
import { isNotEmpty } from '@/lib/utils/is-not-empty';
import { parseAsArrayOf, useQueryState } from 'nuqs';
import { useFilter } from '../../use-filter';
import { FiltersStore } from '../../use-profile-filters';
import { mergeConditions, parseAsId, validateAndFormatOptions } from '../utils';

const filterId = 'supportsProducts';

export const useSupportsProductsFilter = (filterStore: FiltersStore) => {
  const [value, setValue] = useQueryState(
    'productSupports',
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
          query getSupportsProductsOptions($where: SupportsProductsBoolExp) {
            supportsProducts(where: $where) {
              supportsProduct {
                name
                id
                description
              }
            }
          }
        `),
        {
          where: buildSupportsProductsWhere(filterStore)
        }
      );

      const options = Array.from(
        new Map(
          (data?.supportsProducts ?? [])
            .map(item => {
              const id = item.supportsProduct?.id;
              if (!id) return null;
              return {
                value: id,
                label: item.supportsProduct?.name ?? ' - ',
                description: item.supportsProduct?.description ?? ' - '
              };
            })
            .filter(
              (
                option
              ): option is {
                value: string;
                label: string;
                description: string;
              } => option !== null
            )
            .map(option => [option.value, option])
        ).values()
      );

      return validateAndFormatOptions(options);
    },
    getQueryConditions: value => ({
      root: {
        products: {
          supportsProducts: {
            supportsProductId: { _in: value }
          }
        }
      }
    })
  });
};

function buildSupportsProductsWhere(
  filterStore: FiltersStore
): SupportsProductsBoolExp {
  const conditions: SupportsProductsBoolExp[] = [];

  if (isNotEmpty(siteConfig.overrideFilterValues.supportsProducts)) {
    conditions.push({
      supportsProduct: {
        id: { _in: siteConfig.overrideFilterValues.supportsProducts }
      }
    });
  }

  return mergeConditions(conditions);
}
