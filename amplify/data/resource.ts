import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// DynamoDB schema for The Marqet marketplace.
// Author/reviewer profile data is denormalized into Skill/Review to avoid
// N+1 query problems on browse and detail pages.
const schema = a.schema({

  Profile: a.model({
    cognitoId: a.string().required(),
    username: a.string().required(),
    displayName: a.string(),
    bio: a.string(),
    website: a.string(),
    githubUrl: a.string(),
    avatarUrl: a.string(),
    isVerified: a.boolean().default(false),
    isAdmin: a.boolean().default(false),
  })
  .secondaryIndexes((index) => [
    index('cognitoId').queryField('listByCognitoId'),
    index('username').queryField('listByUsername'),
  ])
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.authenticated().to(['create', 'read', 'update']),
  ]),

  Skill: a.model({
    title: a.string().required(),
    slug: a.string().required(),
    shortDescription: a.string().required(),
    longDescription: a.string(),
    category: a.string().required(),
    tags: a.string().array(),
    priceGbp: a.float().default(0),
    repoUrl: a.string(),
    version: a.string().default('1.0.0'),
    changelog: a.string(),
    compatibility: a.string().array(),
    // Author info (denormalized for browse-page single-query performance)
    authorCognitoId: a.string().required(),
    authorUsername: a.string(),
    authorDisplayName: a.string(),
    authorAvatarUrl: a.string(),
    authorIsVerified: a.boolean().default(false),
    // Moderation
    status: a.string().default('pending'),
    adminNotes: a.string(),
    // Metrics (denormalized, updated on review/install)
    installCount: a.integer().default(0),
    avgRating: a.float(),
    reviewCount: a.integer().default(0),
    // Content
    filePath: a.string(),
    skillContent: a.string(),
    license: a.string().default('MIT'),
    featured: a.boolean().default(false),
  })
  .secondaryIndexes((index) => [
    index('slug').queryField('listBySlug'),
    index('status').queryField('listByStatus'),
    index('authorCognitoId').queryField('listByAuthorCognitoId'),
  ])
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.authenticated().to(['create', 'read', 'update']),
  ]),

  Review: a.model({
    skillId: a.id().required(),
    // Reviewer info (denormalized so skill detail doesn't need to fetch each reviewer)
    reviewerCognitoId: a.string().required(),
    reviewerUsername: a.string(),
    reviewerDisplayName: a.string(),
    reviewerAvatarUrl: a.string(),
    rating: a.integer().required(),
    body: a.string(),
    developerResponse: a.string(),
  })
  .secondaryIndexes((index) => [
    index('skillId').queryField('listBySkillId'),
    index('reviewerCognitoId').queryField('listByReviewerCognitoId'),
  ])
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.authenticated().to(['create', 'read', 'update', 'delete']),
  ]),

  Install: a.model({
    skillId: a.id().required(),
    userId: a.string().required(),
    versionInstalled: a.string(),
  })
  .secondaryIndexes((index) => [
    index('skillId').queryField('listInstallsBySkillId'),
    index('userId').queryField('listInstallsByUserId'),
  ])
  .authorization((allow) => [
    allow.authenticated().to(['create', 'read', 'delete']),
  ]),

  ContactRequest: a.model({
    name: a.string().required(),
    email: a.string().required(),
    company: a.string(),
    requestType: a.string().default('custom_build'),
    description: a.string().required(),
    budgetRange: a.string(),
    status: a.string().default('new'),
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['create']),
    allow.authenticated().to(['create', 'read']),
  ]),

  Report: a.model({
    skillId: a.id().required(),
    reporterCognitoId: a.string(),
    reason: a.string().required(),
    details: a.string(),
    status: a.string().default('pending'),
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['create']),
    allow.authenticated().to(['create', 'read']),
  ]),

  Waitlist: a.model({
    email: a.string().required(),
    role: a.string().default('both'),
  })
  .identifier(['email'])
  .authorization((allow) => [
    allow.publicApiKey().to(['create', 'read']),
  ]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 365 },
  },
});
