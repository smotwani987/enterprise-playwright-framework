import { FailureCategory } from "ai/models/FailureCategory";
import { FailureAnalysis } from "ai/models/FailureAnalysis";
import { FailureTest } from "ai/models/FailureTest";

export interface FailureAnalyzerAgent {

    analyze(
        failureTest: FailureTest,
        category: FailureCategory
    ): FailureAnalysis;
}