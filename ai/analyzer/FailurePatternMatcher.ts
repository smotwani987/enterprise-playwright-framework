import { FailureTest } from "../models/FailureTest";
import { FailurePattern } from "../models/FailurePattern";

export class FailurePatternMatcher {

    match(
        failureTest: FailureTest,
        patterns: FailurePattern[]
    ): FailurePattern | undefined {

        const searchableText = `
            ${failureTest.errorMessage}
            ${failureTest.stackTrace}
        `.toLowerCase();

        return patterns.find(pattern =>
            pattern.keywords.some(keyword =>
                searchableText.includes(keyword.toLowerCase())
            )
        );
    }
}