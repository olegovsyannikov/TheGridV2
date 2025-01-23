'use client';

import { useClerkContext } from '@/providers/clerk-provider';

const API_ENDPOINT =
  'https://a2f6zzrqop62jwep7ehq53nn2m0rkwqq.lambda-url.eu-central-1.on.aws/';

export const DB_NAME = 'A';

// Convert all values to strings for API compatibility
export const convertToStrings = (
  obj: Record<string, any>
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      result[key] = '';
    } else {
      result[key] = String(value);
    }
  }
  return result;
};

export interface ApiOperationResult {
  success: boolean;
  error?: string;
  create?: {
    created_records: string[];
  };
  update?: Record<string, never>;
  delete?: Record<string, never>;
  table_name: string;
  db_name: string;
}

export interface ApiResponse {
  results: ApiOperationResult[];
  dry_run: boolean;
  do_not_notify_on_edit: boolean;
}

export interface RestClient {
  create: <T extends Record<string, any>>(
    tableName: string,
    data: T
  ) => Promise<ApiResponse>;
  update: <T extends Record<string, any>>(
    tableName: string,
    id: string,
    data: T
  ) => Promise<ApiResponse>;
  delete: (tableName: string, id: string) => Promise<ApiResponse>;
}

type UserMetadata = {
  user_id: string;
  email: string;
  api_key: string;
};

export const createRestApiClient = (
  getToken: () => Promise<string>,
  userMetadata: UserMetadata
): RestClient => {
  const executeRequest = async (operations: any[]): Promise<ApiResponse> => {
    const token = await getToken();
    const fullPayload = {
      command: 'retool_backend_go/db.crud.direct',
      user: {
        user_id: userMetadata.user_id,
        user_email: userMetadata.email,
        access_key: userMetadata.api_key
      },
      batch: {
        dry_run: false,
        operations
      }
    };

    console.log('Sending API request:', JSON.stringify(fullPayload, null, 2));

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(fullPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(
        `API request failed: ${response.statusText}\n${errorText}`
      );
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
    return data;
  };

  const create = async <T extends Record<string, any>>(
    tableName: string,
    data: T
  ): Promise<ApiResponse> => {
    const operation = {
      table_name: tableName,
      db_name: DB_NAME,
      from: tableName,
      create: {
        list_of_values: [convertToStrings(data)]
      }
    };

    return executeRequest([operation]);
  };

  const update = async <T extends Record<string, any>>(
    tableName: string,
    id: string,
    data: T
  ): Promise<ApiResponse> => {
    const operation = {
      table_name: tableName,
      db_name: DB_NAME,
      from: tableName,
      update: {
        record_id_to_values: {
          [id]: convertToStrings(data)
        }
      }
    };

    return executeRequest([operation]);
  };

  const remove = async (
    tableName: string,
    id: string
  ): Promise<ApiResponse> => {
    const operation = {
      table_name: tableName,
      db_name: DB_NAME,
      from: tableName,
      delete: {
        record_ids_to_delete_list: [id]
      }
    };

    return executeRequest([operation]);
  };

  return {
    create,
    update,
    delete: remove
  };
};

export const useRestApiClient = () => {
  const { getToken, userMetadata } = useClerkContext();

  if (
    !userMetadata?.publicMetadata?.user_id ||
    !userMetadata?.publicMetadata?.email ||
    !userMetadata?.publicMetadata?.api_key
  ) {
    throw new Error(
      'User must be authenticated and have required metadata to use the API client'
    );
  }

  return createRestApiClient(getToken, {
    user_id: userMetadata.publicMetadata.user_id,
    email: userMetadata.publicMetadata.email,
    api_key: userMetadata.publicMetadata.api_key
  });
};
