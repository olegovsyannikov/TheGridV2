// Load environment variables from .env.test
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

// Remove fetch mock for integration tests
if (process.env.TEST_USER_ID && process.env.TEST_ACCESS_KEY) {
  // Don't mock fetch for integration tests
  // Integration tests will use the native fetch
} else {
  // Mock fetch for unit tests
  (global as any).fetch = jest.fn();
}
