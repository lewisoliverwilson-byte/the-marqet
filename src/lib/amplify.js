import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'
import outputs from 'virtual:amplify-outputs'

export const isConfigured = !!outputs

if (outputs) {
  Amplify.configure(outputs)
}

// Public reads — API key auth
export const client = generateClient()

// Authenticated writes — Cognito user pool
export const authClient = generateClient({ authMode: 'userPool' })
