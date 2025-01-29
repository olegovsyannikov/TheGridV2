import { Assets } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateAssetInput = Partial<Assets>;
export type UpdateAssetInput = Partial<Assets> & { id: string };

const TABLE_NAME = 'assets';

export const createAssetsApi = (client: RestClient) => {
  const create = async (input: CreateAssetInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateAssetInput) => {
    const { id, ...data } = input;
    return client.update(TABLE_NAME, id, data);
  };

  const remove = async (id: string) => {
    return client.delete(TABLE_NAME, id);
  };

  return {
    create,
    update,
    delete: remove
  };
};

export const useAssetsApi = (client: RestClient) => {
  return createAssetsApi(client);
};
