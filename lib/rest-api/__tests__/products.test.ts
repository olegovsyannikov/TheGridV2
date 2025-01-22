import { createRestApiClient } from '../client';
import { CreateProductInput, createProductsApi } from '../products';

// Mock the fetch function
const mockFetch = jest.fn();
(global as any).fetch = mockFetch;

describe('ProductsApi', () => {
  const mockUserId = 'test@thegrid.id';
  const mockUserEmail = 'test@thegrid.id';
  const mockAccessKey = 'test-access-key';
  const client = createRestApiClient(mockUserId, mockUserEmail, mockAccessKey);
  const api = createProductsApi(client);

  const testProduct: CreateProductInput = {
    name: 'Test Product',
    description: 'Test product description',
    rootId: '254',
    isMainProduct: 0,
    productTypeId: null,
    productStatusId: null,
    launchDate: null
  };

  let createdProductId: string;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should create a new product', async () => {
    const mockResponse = {
      results: [
        {
          success: true,
          create: {
            created_records: ['test-id-123']
          },
          table_name: 'products',
          db_name: 'A'
        }
      ],
      dry_run: false,
      do_not_notify_on_edit: false
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const response = await api.create(testProduct);
    expect(response).toEqual(mockResponse);
    createdProductId = response.results[0].create.created_records[0];

    // Verify the request
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );

    // Verify the payload structure
    const lastCall = mockFetch.mock.calls[0][1];
    const payload = JSON.parse(lastCall.body);
    expect(payload).toEqual({
      command: 'retool_backend_go/db.crud.direct',
      user: {
        user_id: mockUserId,
        user_email: mockUserEmail,
        access_key: mockAccessKey
      },
      batch: {
        dry_run: false,
        operations: [
          {
            table_name: 'products',
            db_name: 'A',
            from: 'products',
            create: {
              list_of_values: [
                {
                  name: 'Test Product',
                  description: 'Test product description',
                  rootId: '254',
                  isMainProduct: '0',
                  productTypeId: '',
                  productStatusId: '',
                  launchDate: ''
                }
              ]
            }
          }
        ]
      }
    });
  });

  it('should update the product', async () => {
    const mockResponse = {
      results: [
        {
          success: true,
          update: {},
          table_name: 'products',
          db_name: 'A'
        }
      ],
      dry_run: false,
      do_not_notify_on_edit: false
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const updateData = {
      id: createdProductId,
      description: 'Updated test product description'
    };

    const response = await api.update(updateData);
    expect(response).toEqual(mockResponse);

    // Verify the payload structure
    const lastCall = mockFetch.mock.calls[0][1];
    const payload = JSON.parse(lastCall.body);
    expect(payload).toEqual({
      command: 'retool_backend_go/db.crud.direct',
      user: {
        user_id: mockUserId,
        user_email: mockUserEmail,
        access_key: mockAccessKey
      },
      batch: {
        dry_run: false,
        operations: [
          {
            table_name: 'products',
            db_name: 'A',
            from: 'products',
            update: {
              record_id_to_values: {
                [createdProductId]: {
                  description: 'Updated test product description'
                }
              }
            }
          }
        ]
      }
    });
  });

  it('should delete the product', async () => {
    const mockResponse = {
      results: [
        {
          success: true,
          delete: {},
          table_name: 'products',
          db_name: 'A'
        }
      ],
      dry_run: false,
      do_not_notify_on_edit: false
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const response = await api.delete(createdProductId);
    expect(response).toEqual(mockResponse);

    // Verify the payload structure
    const lastCall = mockFetch.mock.calls[0][1];
    const payload = JSON.parse(lastCall.body);
    expect(payload).toEqual({
      command: 'retool_backend_go/db.crud.direct',
      user: {
        user_id: mockUserId,
        user_email: mockUserEmail,
        access_key: mockAccessKey
      },
      batch: {
        dry_run: false,
        operations: [
          {
            table_name: 'products',
            db_name: 'A',
            from: 'products',
            delete: {
              record_ids_to_delete_list: [createdProductId]
            }
          }
        ]
      }
    });
  });

  it('should handle API errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
      text: async () => 'Something went wrong'
    });

    await expect(api.create(testProduct)).rejects.toThrow(
      'API request failed: Internal Server Error\nSomething went wrong'
    );
  });
});
