import { ProfileInfos } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateProfileInfoInput = Partial<ProfileInfos>;
export type UpdateProfileInfoInput = Partial<ProfileInfos> & { id: string };

const TABLE_NAME = 'profileInfos';

export const createProfileInfosApi = (client: RestClient) => {
  const create = async (input: CreateProfileInfoInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateProfileInfoInput) => {
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

export const useProfileInfosApi = (client: RestClient) => {
  return createProfileInfosApi(client);
};
