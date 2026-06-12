export interface FailureContext{
    testName: string,
    errorMessage : string,
    stackTrace?:string
    specFile?: string,
    browser?:string
};