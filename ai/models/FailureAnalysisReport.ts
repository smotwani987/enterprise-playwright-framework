import { FailureTest } from "./FailureTest";
import { FailureAnalysis } from "./FailureAnalysis";
import { FailureCategory } from "./FailureCategory";
import { FailureMemoryMatch } from "./FailureMemoryMatch";

export interface FailureAnalysisReport {
    testName: string;
    status: string;
    durationMs: number;
    errorMessage: string;
    category: FailureCategory;
    analysis: FailureAnalysis;
    originalFailure: FailureTest;
    memoryMatch?: FailureMemoryMatch;
}