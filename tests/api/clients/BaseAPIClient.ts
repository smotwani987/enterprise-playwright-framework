import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiLogger } from '../utils/APILogger';
import { headers } from '../data/headers';

export class BaseAPIClient {

    protected apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    protected async get(url: string): Promise<APIResponse> {
        ApiLogger.logRequest('GET', url);
        
        const response = await this.apiContext.get(url);

        ApiLogger.logResponse(response.status(),await response.json());

        return response;
    }

    protected async post(url: string,payload: any): Promise<APIResponse> {

        ApiLogger.logRequest('POST',url,payload);

        const response =await this.apiContext.post(url, 
            {
                data: payload,
                headers:headers
            });

        ApiLogger.logResponse(response.status(),'Response recieved');

        return response;
        
    }

    protected async put(url: string,payload: any): Promise<APIResponse> {

        ApiLogger.logRequest('PUT',url,payload);

        const response =await this.apiContext.put(url, {data: payload});

        ApiLogger.logResponse(response.status(),await response.json());

        return response;
    }

    protected async delete(url: string): Promise<APIResponse> {

        ApiLogger.logRequest('DELETE',url);

        const response =await this.apiContext.delete(url);

        ApiLogger.logResponse(response.status(),await response.text());

        return response;
    }
}