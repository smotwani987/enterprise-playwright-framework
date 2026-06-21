import { FailureCategory } from "./FailureCategory";

export interface FailurePattern {

    keywords: string[];

    category: FailureCategory;

    rootCause: string;

    confidence: number;

    suggestedFixes: string[];
}