import { createRestApiClient } from '../client';
import { CreateProductInput, createProductsApi } from '../products';

// Only run these tests if integration test env vars are set
const TEST_USER_ID = process.env.TEST_USER_ID;
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_ACCESS_KEY = process.env.TEST_ACCESS_KEY;

// Skip all tests if credentials are not provided
const describeif =
  TEST_USER_ID && TEST_USER_EMAIL && TEST_ACCESS_KEY ? describe : describe.skip;

describeif('ProductsApi Integration', () => {
  const client = createRestApiClient(
    TEST_USER_ID!,
    TEST_USER_EMAIL!,
    TEST_ACCESS_KEY!
  );
  const api = createProductsApi(client);

  const testProduct: CreateProductInput = {
    name: 'Integration Test Product',
    description: `Test product created by ${TEST_USER_EMAIL}`,
    rootId: '254',
    isMainProduct: 0,
    productTypeId: null,
    productStatusId: null,
    launchDate: null
  };

  let createdProductId: string;

  it('should create a new product', async () => {
    console.log('Creating product with payload:', {
      ...testProduct,
      created_by: TEST_USER_EMAIL
    });

    const response = await api.create(testProduct);
    expect(response).toBeDefined();
    expect(response.results).toBeDefined();
    expect(response.results[0]).toBeDefined();
    expect(response.results[0].error).toBeUndefined();
    expect(response.results[0].success).toBe(true);
    expect(response.results[0].create).toBeDefined();
    expect(response.results[0].create?.created_records).toBeDefined();
    expect(response.results[0].create?.created_records[0]).toBeDefined();
    createdProductId = response.results[0].create!.created_records[0];

    console.log(
      `Created product with ID: ${createdProductId} by ${TEST_USER_EMAIL}`
    );
  });

  it('should update the product', async () => {
    expect(createdProductId).toBeDefined();

    const updateData = {
      id: createdProductId,
      description: `Updated integration test product by ${TEST_USER_EMAIL}`
    };

    console.log('Updating product with payload:', {
      ...updateData,
      updated_by: TEST_USER_EMAIL
    });

    const response = await api.update(updateData);
    expect(response).toBeDefined();
    expect(response.results).toBeDefined();
    expect(response.results[0]).toBeDefined();
    expect(response.results[0].error).toBeUndefined();
    expect(response.results[0].success).toBe(true);
    expect(response.results[0].update).toBeDefined();

    console.log('Updated product:', response.results[0]);
  });

  it('should delete the product', async () => {
    expect(createdProductId).toBeDefined();
    console.log('Deleting product with ID:', createdProductId);

    const response = await api.delete(createdProductId);
    expect(response).toBeDefined();
    expect(response.results).toBeDefined();
    expect(response.results[0]).toBeDefined();
    expect(response.results[0].error).toBeUndefined();
    expect(response.results[0].success).toBe(true);
    expect(response.results[0].delete).toBeDefined();

    console.log(
      `Deleted product with ID: ${createdProductId} by ${TEST_USER_EMAIL}`
    );
  });
});
