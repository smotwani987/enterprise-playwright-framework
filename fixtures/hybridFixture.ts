import { APIRequestContext, request } from '@playwright/test';
import { test as hybridBase, expect } from './baseFixture';
import { AuthHelper } from '../utils/AuthHelper';

type MyFixtures = {
    apiContext: APIRequestContext;
};

export const test = hybridBase.extend<MyFixtures>({
    apiContext: async ({}, use) => {
        const token = await AuthHelper.generateAuthToken();
        const apiContext = await request.newContext({
            baseURL: process.env.API_BASE_URL,
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        await use(apiContext);
        await apiContext.dispose();
    }
});

export { expect };