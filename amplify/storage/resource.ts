import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'skillFiles',
  access: (allow) => ({
    'skill-files/{entity_id}/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
    'skill-files/public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
  }),
});
