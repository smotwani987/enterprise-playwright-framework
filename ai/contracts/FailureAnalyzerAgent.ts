import { FailureAnalysis } from "ai/models/FailureAnalysis";
import { FailureTest } from "../models/FailureTest";
import { FailureCategory } from "ai/models/FailureCategory";

export interface FailureAnalyzerAgent {
    analyze(failedTest: FailureTest,category:FailureCategory):FailureAnalysis;
}