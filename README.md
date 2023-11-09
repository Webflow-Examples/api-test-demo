# Webflow API Test Suite

This repository contains a test suite for the Webflow API, designed to ensure that interactions with the Webflow API perform as expected. The tests use the `axios` HTTP client to make requests to the Webflow API and `jest` along with `jest-json-schema` for assertions and schema validations.

## Overview

The test suite includes several end-to-end tests that check the functionality of different endpoints of the Webflow API, including:

- Retrieving authorized user information
- Token introspection
- Listing all sites associated with the user
- Fetching all collections for a site
- Creating a new collection within a site

Each test verifies the response status code and response body against predefined JSON schemas.

## Prerequisites

Before you can run the tests, you need to obtain an access token from Webflow. Please refer to the [Webflow API documentation on authorization](https://developers.webflow.com/reference/authorization) for instructions on how to get your access token.

## Installation

1. Clone the repository to your local machine.
2. Install the necessary npm packages by running `npm install`.

## Configuration

Replace the placeholder text `'Replace Me'` with your actual access token and site ID in the provided code file. These are marked as `TODO` comments.

## Running Tests

To run the test suite, use the following command:

```sh
npm test
```

Make sure your access token and site ID are correctly set up before running the tests.

## Schemas
The repository also contains schema files used to validate the API response. These schemas are located in the ./webflow-schemas directory. Each test will match the API response against these schemas to validate the structure and type of data returned.
