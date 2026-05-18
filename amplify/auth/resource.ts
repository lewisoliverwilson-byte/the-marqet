import { defineAuth, secret } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Verify your Marqet account',
    },
    // GitHub OAuth via Cognito OIDC.
    // Prerequisites (one-time setup):
    //   1. Create a GitHub OAuth App at github.com/settings/developers
    //      - Homepage URL: https://master.d3gnlzwnm7m2s9.amplifyapp.com
    //      - Callback URL: https://<cognito-domain>.auth.<region>.amazoncognito.com/oauth2/idpresponse
    //   2. Add secrets via: npx ampx secret set GITHUB_CLIENT_ID
    //                       npx ampx secret set GITHUB_CLIENT_SECRET
    //   3. Uncomment the block below and redeploy
    //
    // externalProviders: {
    //   oidc: [{
    //     name: 'GitHub',
    //     clientId: secret('GITHUB_CLIENT_ID'),
    //     clientSecret: secret('GITHUB_CLIENT_SECRET'),
    //     issuerUrl: 'https://token.actions.githubusercontent.com',
    //     attributeMapping: {
    //       email: 'email',
    //       preferredUsername: 'login',
    //       profilePicture: 'avatar_url',
    //     },
    //   }],
    //   callbackUrls: [
    //     'http://localhost:5173/auth/callback',
    //     'https://master.d3gnlzwnm7m2s9.amplifyapp.com/auth/callback',
    //   ],
    //   logoutUrls: [
    //     'http://localhost:5173',
    //     'https://master.d3gnlzwnm7m2s9.amplifyapp.com',
    //   ],
    // },
  },
  userAttributes: {
    preferredUsername: { required: false, mutable: true },
    name: { required: false, mutable: true },
    picture: { required: false, mutable: true },
  },
});
