const authorizationSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    createdOn: { type: "string", format: "date-time" },
    lastUsed: { type: "string", format: "date-time" },
    grantType: { type: "string" },
    rateLimit: { type: "number" },
    scope: { type: "string" },
    authorizedTo: {
      type: "object",
      properties: {
        siteIds: { type: "array", items: { type: "string" } },
        workspaceIds: { type: "array", items: { type: "string" } },
        userIds: { type: "array", items: { type: "string" } }
      },
      required: ["siteIds", "workspaceIds", "userIds"]
    }
  },
  required: ["id", "createdOn", "lastUsed", "grantType", "rateLimit", "scope", "authorizedTo"]
};

const applicationSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    description: { type: "string" },
    homepage: { type: "string" },
    displayName: { type: "string" }
  },
  required: ["id", "description", "homepage", "displayName"]
};

const introspectTokenSchema = {
  type: "object",
  properties: {
    authorization: authorizationSchema,
    application: applicationSchema
  },
  required: ["authorization", "application"]
};

const authorizedUserInfoSchema = {
  type: 'object',
  required: ['id', 'email', 'firstName', 'lastName'],
  properties: {
    id: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
  },
};

const listSitesSchema = {
  type: "object",
  required: ["sites"],
  properties: {
    sites: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "workspaceId", "displayName", "shortName", "previewUrl", "timeZone", "createdOn", "lastUpdated"],
        properties: {
          id: {
            type: "string",
            pattern: "^[a-f\\d]{24}$" // Regular expression for a 24-character hexadecimal string
          },
          workspaceId: {
            type: "string",
            pattern: "^[a-f\\d]{24}$"
          },
          displayName: {
            type: "string"
          },
          shortName: {
            type: "string"
          },
          previewUrl: {
            type: ["string", "null"],
            format: "uri"
          },
          timeZone: {
            type: "string"
          },
          createdOn: {
            type: "string",
            format: "date-time"
          },
          lastUpdated: {
            type: "string",
            format: "date-time"
          },
          lastPublished: {
            type: ["string", "null"],
            format: "date-time"
          },
          customDomains: {
            type: "array",
            items: {
              type: "string"
            }
          },
          locales: {
            type: ["object", "null"],
            properties: {
              primary: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  cmsId: { type: "string" },
                  enabled: { type: "boolean" },
                  displayName: { type: "string" },
                  redirect: { type: "boolean" },
                  subdirectory: { type: "string" },
                  tag: { type: "string" }
                },
                required: ["id", "cmsId", "enabled", "displayName", "redirect", "subdirectory", "tag"]
              },
              secondary: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    cmsId: { type: "string" },
                    enabled: { type: "boolean" },
                    displayName: { type: "string" },
                    subdirectory: { type: "string" },
                    tag: { type: "string" }
                  },
                  required: ["id", "cmsId", "enabled", "displayName", "subdirectory", "tag"]
                }
              }
            },
            required: []
          }
        },
        additionalProperties: false
      }
    }
  },
  additionalProperties: false
};

const collectionsSchema = {
  type: 'object',
  properties: {
    collections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          displayName: { type: 'string' },
          singularName: { type: 'string' },
          slug: { type: 'string' },
          createdOn: { type: 'string', format: 'date-time' }, // Format can be adjusted as needed
          lastUpdated: { type: 'string', format: 'date-time' } // Format can be adjusted as needed
        },
        required: ['id', 'displayName', 'singularName', 'slug', 'createdOn', 'lastUpdated']
      }
    }
  },
  required: ['collections']
};

const createCollectionSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    displayName: { type: 'string' },
    singularName: { type: 'string' },
    slug: { type: 'string' },
    createdOn: { type: 'string', format: 'date-time' },
    lastUpdated: { type: 'string', format: 'date-time' },
    fields: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          isEditable: { type: 'boolean' },
          isRequired: { type: 'boolean' },
          type: { type: 'string' },
          slug: { type: 'string' },
          displayName: { type: 'string' },
          helpText: { type: ['string', 'null'] }
        },
        required: ['id', 'isEditable', 'isRequired', 'type', 'slug', 'displayName']
      }
    }
  },
  required: ['id', 'displayName', 'singularName', 'slug', 'createdOn', 'lastUpdated', 'fields']
};

module.exports = {
  authorizationSchema,
  applicationSchema,
  introspectTokenSchema,
  authorizedUserInfoSchema,
  listSitesSchema,
  collectionsSchema,
  createCollectionSchema
};