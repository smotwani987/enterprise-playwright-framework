import { FailureClassifier } from "../contracts/FailureClassifier";
import { FailureTest } from "../models/FailureTest";
import { FailureCategory } from "../models/FailureCategory";

export class RuleBasedFailureClassifier implements FailureClassifier {

    classify(failureTest: FailureTest): FailureCategory {

        const error =
            failureTest.errorMessage.toLowerCase();

        if (
            error.includes("tobetruthy") ||
            error.includes("toequal") ||
            error.includes("tocontain")
        ) {
            return FailureCategory.ASSERTION_FAILURE;
        }

        if (
            error.includes("tobevisible") ||
            error.includes("element(s) not found") ||
            error.includes("locator") ||
            error.includes("strict mode violation")
        ) {
            return FailureCategory.LOCATOR_FAILURE;
        }

        if (
            failureTest.status === "timedOut"
        ) {
            return FailureCategory.TIMEOUT_FAILURE;
        }

        return FailureCategory.UNKNOWN_FAILURE;
    }
}