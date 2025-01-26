import { CodegenConfig } from '@graphql-codegen/cli';
import { config } from 'dotenv';

config();

const codegenConfig: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,
  // overwrite: true,
  ignoreNoDocuments: true,
  documents: [
    'lib/**/*.graphql.ts',
    '{app,components}/**/*.{tsx,ts}',
    '!lib/graphql/generated/**/*'
  ],
  config: {
    skipDocumentsValidation: {
      ignoreRules: ['MaxIntrospectionDepthRule']
    }
  },
  generates: {
    'lib/graphql/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string',
        dedupeFragments: true,
        extractAllFieldsToTypes: true,
        experimentalFragmentVariables: true,
        allowUndefinedQueryVariables: true,
        strictScalars: true,
        scalars: {
          Date: {
            input: 'string',
            output: 'string'
          },
          Float1: {
            input: 'number',
            output: 'number'
          },
          Float64: {
            input: 'number',
            output: 'number'
          },
          Int1: {
            input: 'number',
            output: 'number'
          },
          Int8: {
            input: 'number',
            output: 'number'
          },
          Int64: {
            input: 'number',
            output: 'number'
          },
          String1: {
            input: 'string',
            output: 'string'
          },
          String2: {
            input: 'string',
            output: 'string'
          },
          Json: {
            input: 'any',
            output: 'any'
          },
          jsonb: {
            input: 'any',
            output: 'any'
          },
          numeric: {
            input: 'number',
            output: 'number'
          },
          timestamptz: {
            input: 'string',
            output: 'string'
          },
          Timestamp: {
            input: 'string',
            output: 'string'
          },
          uuid: {
            input: 'string',
            output: 'string'
          }
        }
      }
    },
    'lib/graphql/generated/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  }
  // hooks: {
  //   afterOneFileWrite: ['prettier --write', 'echo']
  // }
};

export default codegenConfig;
