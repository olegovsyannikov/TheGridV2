import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  __TypeKind,
  GetOrderByFieldsQuery,
  OrderBy,
  useGetOrderByFieldsQuery
} from '@/lib/graphql/generated-graphql';
import { Sorting } from '../../hooks/use-profile-sorting';
import { memo, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { useProfileSortingContext } from '@/providers/sorting-provider';

const ProfileListSortingComponent = () => {
  const { data } = useGetOrderByFieldsQuery({
    name: 'CProfileInfosOrderBy'
  });

  const { sorting } = useProfileSortingContext();

  const options = useMemo(() => extractOrderByOptions(data), [data]);

  return (
    <div className="flex w-full flex-col justify-end gap-4 md:flex-row">
      <div className="flex flex-col gap-1">
        <Label className="text-xs">Sort by</Label>
        <Select
          value={sorting.sortBy}
          onValueChange={value => {
            sorting.setSortBy(value);
          }}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {options.map(item => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-xs">Sort order</Label>
        <Select
          value={sorting.sortOrder}
          onValueChange={value => {
            sorting.setSortOrder(value as OrderBy);
          }}
        >
          <SelectTrigger className="w-full md:w-[130px]">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={OrderBy.Asc}>Ascending</SelectItem>
            <SelectItem value={OrderBy.Desc}>Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const extractOrderByOptions = (data?: GetOrderByFieldsQuery): string[] => {
  const fields = data?.__type?.inputFields || [];
  let options: string[] = [];

  const extractFields = (
    fieldList: Array<{ name: string; type: any }>,
    prefix: string = ''
  ): void => {
    fieldList.forEach(field => {
      const fieldName = prefix ? `${prefix}.${field.name}` : field.name;
      if (field.type?.inputFields && field.type.inputFields.length > 0) {
        extractFields(field.type.inputFields, fieldName);
      } else if (
        field.type?.ofType?.inputFields &&
        field.type.ofType.inputFields.length > 0
      ) {
        extractFields(field.type.ofType.inputFields, fieldName);
      } else {
        options.push(fieldName);
      }
    });
  };

  extractFields(fields);
  return options.sort((a, b) => {
    if (a.split('.').length < b.split('.').length) {
      return -1;
    }

    return 0;
  });
};

export const ProfileListSorting = memo(ProfileListSortingComponent);
