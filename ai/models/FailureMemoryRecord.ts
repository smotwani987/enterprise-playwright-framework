import { FailureCategory } from "./FailureCategory";

export interface FailureMemoryRecord {
    testName: string;
    category: FailureCategory;

    errorSignature: string;
    rootCause: string;
    suggestedFixes: string[];

    occurrenceCount: number;

    firstSeen: string;
    lastSeen: string;
}