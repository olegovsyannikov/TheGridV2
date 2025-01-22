import { CProducts } from '../graphql/generated/graphql';
import { convertToStrings, CrudOperationPayload, DB_NAME } from './client';

export type CreateProductInput = Pick<
  CProducts,
  | 'name'
  | 'description'
  | 'rootId'
  | 'isMainProduct'
  | 'productTypeId'
  | 'productStatusId'
  | 'launchDate'
>;

export type UpdateProductInput = Partial<CreateProductInput> & { id: string };

const TABLE_NAME = 'products';
const FROM = 'products';

export const createProductsApi = (client: {
  execute: (operations: CrudOperationPayload[]) => Promise<any>;
}) => {
  const create = async (input: CreateProductInput) => {
    const operation: CrudOperationPayload = {
      table_name: TABLE_NAME,
      db_name: DB_NAME,
      from: FROM,
      create: {
        list_of_values: [convertToStrings(input)]
      }
    };

    return client.execute([operation]);
  };

  const update = async (input: UpdateProductInput) => {
    const { id, ...data } = input;
    const operation: CrudOperationPayload = {
      table_name: TABLE_NAME,
      db_name: DB_NAME,
      from: FROM,
      update: {
        record_id_to_values: {
          [id]: convertToStrings(data)
        }
      }
    };

    return client.execute([operation]);
  };

  const remove = async (id: string) => {
    const operation: CrudOperationPayload = {
      table_name: TABLE_NAME,
      db_name: DB_NAME,
      from: FROM,
      delete: {
        record_ids_to_delete_list: [id]
      }
    };

    return client.execute([operation]);
  };

  return {
    create,
    update,
    delete: remove
  };
};

export const useProductsApi = (client: {
  execute: (operations: CrudOperationPayload[]) => Promise<any>;
}) => {
  return createProductsApi(client);
};
