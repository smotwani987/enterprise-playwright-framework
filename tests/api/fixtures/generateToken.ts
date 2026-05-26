import { test as base, request } from '@playwright/test';

type APIFixture = {
    apiContext: any;
};

export const test = base.extend<APIFixture>({

    apiContext: async ({ }, use: (value: any) => Promise<void>) => {

        // Create temporary request context for auth
        const authContext = await request.newContext();

        // Generate token
        const authResponse = await authContext.post(
            'https://restful-booker.herokuapp.com/auth',
            {
                data: {
                    username: 'admin',
                    password: 'password123'
                }
            }
        );

        const authBody = await authResponse.json();

        const token = authBody.token;

        console.log(`Generated Token: ${token}`);

        // Create authenticated API context
        const apiContext = await request.newContext({

            extraHTTPHeaders: {
                Cookie: `token=${token}`,
                'Content-Type': 'application/json'
            }

        });

        // Provide fixture
        await use(apiContext);

        // Cleanup
        await apiContext.dispose();
        await authContext.dispose();
    }

});

export { expect } from '@playwright/test';