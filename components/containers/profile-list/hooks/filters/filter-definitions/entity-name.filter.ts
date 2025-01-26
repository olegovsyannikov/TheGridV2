import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import { parseAsArrayOf, useQueryState } from 'nuqs';
import { useFilter } from '../../use-filter';
import { FiltersStore } from '../../use-profile-filters';
import { parseAsId, validateAndFormatOptions } from '../utils';

const filterId = 'entityName';

export const useEntityNameFilter = (filterStore: FiltersStore) => {
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
          query getEntityNameOptions($where: EntitiesBoolExp) {
            entities(where: $where) {
              label: name
              value: id
            }
          }
        `),
        { where }
      );
      return validateAndFormatOptions(data?.entities);
    },
    getQueryConditions: value => ({
      root: {
        entities: {
          id: { _in: value }
        }
      }
    })
  });
};
