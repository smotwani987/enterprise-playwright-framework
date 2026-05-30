export class ApiLogger {

    static logRequest(
        method: string,
        url: string,
        payload?: any
    ) {

        console.log(`
==================================================
REQUEST
==================================================
Method: ${method}
URL: ${url}

Payload:
${JSON.stringify(payload, null, 2)}
`);
    }

    static logResponse(
        status: number,
        body: any
    ) {

        console.log(`
==================================================
RESPONSE
==================================================
Status: ${status}
Body:
${JSON.stringify(body, null, 2)}
`);
    }
};