export interface FailureTest {
    testName: string;
    status: string;
    errorMessage: string;
    stackTrace: string;
    filePath?: string;
    lineNumber?: number;
    screenshotPath?: string;
    durationMs: number;
}