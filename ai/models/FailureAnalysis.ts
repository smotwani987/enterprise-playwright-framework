import { FailureCategory } from "ai/models/FailureCategory";

export interface FailureAnalysis {
    category: FailureCategory;
    rootCause: string;
    confidence: number;
    suggestedFixes: string[];
}