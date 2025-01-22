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

export interface CreateOperation {
  list_of_values: Record<string, string>[];
}

export interface UpdateOperation {
  record_id_to_values: Record<string, Record<string, string>>;
}

export interface DeleteOperation {
  record_ids_to_delete_list: string[];
}

export interface CrudOperationPayload {
  table_name: string;
  db_name: string;
  from: string;
  create?: CreateOperation;
  update?: UpdateOperation;
  delete?: DeleteOperation;
}

export interface CrudPayload {
  command: string;
  user: {
    user_id: string;
    user_email: string;
    access_key: string;
  };
  batch: {
    dry_run: boolean;
    operations: CrudOperationPayload[];
  };
}

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

export const createRestApiClient = (
  userId: string,
  userEmail: string,
  accessKey: string
) => {
  const execute = async (operations: CrudOperationPayload[]) => {
    const fullPayload: CrudPayload = {
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

  return { execute };
};

export const useRestApiClient = () => {
  const { user } = useContext(UserContext);

  if (!user?.id || !user?.email || !user?.accessKey) {
    throw new Error('User context is required for API client');
  }

  return createRestApiClient(user.id, user.email, user.accessKey);
};
