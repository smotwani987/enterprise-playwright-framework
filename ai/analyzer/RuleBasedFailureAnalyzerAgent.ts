import { FailureAnalyzerAgent } from "../contracts/FailureAnalyzerAgent";
import { FailureTest } from "../models/FailureTest";
import { FailureAnalysis } from "../models/FailureAnalysis";
import { FailureCategory } from "../models/FailureCategory";
import { FailurePattern } from "../models/FailurePattern";
import { FailurePatternMatcher } from "./FailurePatternMatcher";
import { FailurePatternLoader } from "./FailurePatternLoader";

export class RuleBasedFailureAnalyzerAgent implements FailureAnalyzerAgent {

    private readonly patternMatcher: FailurePatternMatcher;
    private readonly patterns: FailurePattern[];

    constructor() {
        this.patternMatcher=new FailurePatternMatcher();
        const loader = new FailurePatternLoader();
        this.patterns = loader.load("ai/knowledge-base/failure-patterns.json");
    }

    analyze(failureTest: FailureTest,category: FailureCategory): FailureAnalysis {

        const matchedPattern =
            this.patternMatcher.match(
                failureTest,
                this.patterns
            );

        if (matchedPattern) {
            return {
                category: matchedPattern.category,
                rootCause: matchedPattern.rootCause,
                confidence: matchedPattern.confidence,
                suggestedFixes: matchedPattern.suggestedFixes
            };
        }

        return this.defaultAnalysis(category);
    }

    private defaultAnalysis(
        category: FailureCategory
    ): FailureAnalysis {

        switch (category) {

            case FailureCategory.ASSERTION_FAILURE:
                return {
                    category,
                    rootCause:
                        "Actual result does not match expected result.",
                    confidence: 70,
                    suggestedFixes: [
                        "Verify test data",
                        "Verify expected result",
                        "Validate API/UI response before assertion"
                    ]
                };

            case FailureCategory.LOCATOR_FAILURE:
                return {
                    category,
                    rootCause:
                        "Element was not found or not visible on page.",
                    confidence: 70,
                    suggestedFixes: [
                        "Review locator strategy",
                        "Check page navigation",
                        "Use stable locators"
                    ]
                };

            case FailureCategory.TIMEOUT_FAILURE:
                return {
                    category,
                    rootCause:
                        "Execution exceeded configured timeout.",
                    confidence: 65,
                    suggestedFixes: [
                        "Review wait strategy",
                        "Review navigation timing",
                        "Investigate slow application response"
                    ]
                };

            default:
                return {
                    category,
                    rootCause:
                        "Unable to determine root cause.",
                    confidence: 40,
                    suggestedFixes: [
                        "Manual investigation required",
                        "Add more failure patterns"
                    ]
                };
        }
    }
}