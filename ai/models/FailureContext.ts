export interface FailureContext{
    testName: string,
    errorMessage : string,
    stackTrace?:string
    specFiler?: string,
    browser?:string
};