import { FailureMemoryRecord } from "./FailureMemoryRecord";

export interface FailureMemoryMatch {
    isRecurring: boolean;
    occurrenceCount: number;
    matchedRecord?: FailureMemoryRecord;
}