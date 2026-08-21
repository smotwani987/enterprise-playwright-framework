import { APIRequestContext, request, BrowserContext } from '@playwright/test';

export class AuthHelper {
  static async generateAuthToken(): Promise<string> {
    const authContext: APIRequestContext = await request.newContext({
      baseURL: process.env.API_BASE_URL
    });

    const response = await authContext.post('/auth', {
      data: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      }
    });

    if (!response.ok()) {
      throw new Error(`Auth API failed with status: ${response.status()}`);
    }

    const body = await response.json();
    await authContext.dispose();

    // the operator -> ?? = Nullish Coalescing Operator
    // = Checks if left(.access_token) is null or not if yes use right(.token)
    return body.access_token ?? body.token;
  }

  static async injectTokenIntoBrowserContext(
    context: BrowserContext,
    token: string
  ): Promise<void> {
    await context.addCookies([
      {
        name: 'authToken',
        value: token,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'Lax'
      }
    ]);
  }
}