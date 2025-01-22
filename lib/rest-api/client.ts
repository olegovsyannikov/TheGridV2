import { createContext, useContext } from 'react';

export type User = {
  id: string;
  email: string;
  accessKey: string;
};

export type UserContextType = {
  user: User | null;
};

export const UserContext = createContext<UserContextType>({ user: null });

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

export const createRestApiClient = (
  userId: string,
  userEmail: string,
  accessKey: string
): RestClient => {
  const executeRequest = async (operations: any[]): Promise<ApiResponse> => {
    const fullPayload = {
      command: 'retool_backend_go/db.crud.direct',
      user: {
        user_id: userId,
        user_email: userEmail,
        access_key: accessKey
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
        'Content-Type': 'application/json'
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
  const { user } = useContext(UserContext);

  if (!user?.id || !user?.email || !user?.accessKey) {
    throw new Error('User context is required for API client');
  }

  return createRestApiClient(user.id, user.email, user.accessKey);
};
