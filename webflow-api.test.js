const axios = require('axios');
const { matchers } = require('jest-json-schema');
expect.extend(matchers);
const { introspectTokenSchema, authorizedUserInfoSchema, listSitesSchema, collectionsSchema, createCollectionSchema } = require('./webflow-schemas');

// Base axios instance with Webflow API configuration
const accessToken = 'Replace Me'; // TODO: Replace with your access token
// To get an access token refer to: https://developers.webflow.com/reference/authorization

const api = axios.create({
  baseURL: 'https://api.webflow.com/',
  headers: {
    'Accept-Version': '2.0.0',
    'Content-Type': 'application/json',
    'authorization': `Bearer ${accessToken}`
  },
});

// Test suite for Webflow API
describe('Webflow API End-to-End Tests', () => {
  test('Get Authorized User Information', async () => {
    const response = await api.get('/v2/token/authorized_by');
    expect(response.status).toBe(200);
    expect(response.data).toMatchSchema(authorizedUserInfoSchema);
  });

  test('Introspect Token', async () => {
    const response = await api.get('/v2/token/introspect');
    expect(response.status).toBe(200);
    expect(response.data).toMatchSchema(introspectTokenSchema);
  });

  test('Get Sites', async () => {
    const response = await api.get('/v2/sites');
    expect(response.status).toBe(200);
    expect(response.data).toMatchSchema(listSitesSchema);
  });

  test('Get Collections for a Site', async () => {
    const siteId = 'Replace Me'; // TODO: Replace with your site ID
    const response = await api.get(`/v2/sites/${siteId}/collections`);

    expect(response.status).toBe(200);
    expect(response.data).toMatchSchema(collectionsSchema);
  });

  test('Create a Collection in a Site', async () => {
    const siteId = 'Replace Me'; // TODO: Replace with your site ID
    const timestamp = Date.now();
    const collectionData = {
      displayName: `Blog Posts ${timestamp}`,
      singularName: `Blog-${timestamp}`,
    };

    const response = await api.post(`/v2/sites/${siteId}/collections`, collectionData);

    expect(response.status).toBe(200);
    expect(response.data).toMatchSchema(createCollectionSchema);
  });

});
