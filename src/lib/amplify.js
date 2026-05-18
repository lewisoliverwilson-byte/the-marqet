import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'

const REGION = import.meta.env.VITE_AWS_REGION || 'us-east-1'

export const isConfigured = !!(
  import.meta.env.VITE_USER_POOL_ID &&
  import.meta.env.VITE_USER_POOL_CLIENT_ID &&
  import.meta.env.VITE_GRAPHQL_ENDPOINT &&
  import.meta.env.VITE_API_KEY
)

if (isConfigured) {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
        loginWith: { email: true },
      },
    },
    API: {
      GraphQL: {
        endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
        region: REGION,
        defaultAuthMode: 'apiKey',
        apiKey: import.meta.env.VITE_API_KEY,
      },
    },
    ...(import.meta.env.VITE_S3_BUCKET ? {
      Storage: {
        S3: {
          bucket: import.meta.env.VITE_S3_BUCKET,
          region: REGION,
        },
      },
    } : {}),
  })
}

// Public reads — API key auth
export const client = generateClient()

// Authenticated writes — Cognito user pool
export const authClient = generateClient({ authMode: 'userPool' })
