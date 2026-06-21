import { FailureTest } from "../models/FailureTest";
import { FailureCategory } from "ai/models/FailureCategory";

export interface FailureClassifier {
    classify(failureTest: FailureTest): FailureCategory;
}