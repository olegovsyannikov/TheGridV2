import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import { parseAsArrayOf, useQueryState } from 'nuqs';
import { useFilter } from '../../use-filter';
import { FiltersStore } from '../../use-profile-filters';
import { parseAsId, validateAndFormatOptions } from '../utils';

const filterId = 'assetTicker';

export const useAssetTickerFilter = (filterStore: FiltersStore) => {
  const [value, setValue] = useQueryState(
    filterId,
    parseAsArrayOf(parseAsId).withDefault([])
  );

  return useFilter<string, string>({
    id: filterId,
    type: 'multiselect',
    initialValue: value,
    onChange: newValue => setValue(newValue),
    getOptions: async () => {
      const where = {};
      const data = await execute(
        graphql(`
          query getAssetTickerOptions($where: AssetsBoolExp) {
            assets(where: $where) {
              ticker
            }
          }
        `),
        { where }
      );
      const options = data?.assets
        ?.map(item => ({
          value: item.ticker,
          label: item.ticker,
          description: undefined
        }))
        .filter(option => option.label?.trim());
      return validateAndFormatOptions(options);
    },
    getQueryConditions: value => ({
      root: {
        assets: {
          ticker: { _in: value }
        }
      }
    })
  });
};
