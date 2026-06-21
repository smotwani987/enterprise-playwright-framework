import { AgentTool } from "./AgentTool";
import { FailureTest } from "../models/FailureTest";
import { FailureCategory } from "../models/FailureCategory";
import { RuleBasedFailureClassifier } from "../classifier/RuleBasedFailureClassifier";

export class FailureClassificationTool
    implements AgentTool<FailureTest, FailureCategory> {

    name = "FailureClassificationTool";

    private readonly classifier: RuleBasedFailureClassifier;

    constructor() {
        this.classifier = new RuleBasedFailureClassifier();
    }

    async execute(
        failureTest: FailureTest
    ): Promise<FailureCategory> {

        return this.classifier.classify(failureTest);
    }
}