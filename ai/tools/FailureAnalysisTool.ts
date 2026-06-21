import { AgentTool } from "./AgentTool";
import { FailureTest } from "../models/FailureTest";
import { FailureCategory } from "../models/FailureCategory";
import { FailureAnalysis } from "../models/FailureAnalysis";
import { RuleBasedFailureAnalyzerAgent } from "../analyzer/RuleBasedFailureAnalyzerAgent";

export interface FailureAnalysisToolInput {
    failureTest: FailureTest;
    category: FailureCategory;
}

export class FailureAnalysisTool
    implements AgentTool<FailureAnalysisToolInput, FailureAnalysis> {

    name = "FailureAnalysisTool";

    private readonly analyzer: RuleBasedFailureAnalyzerAgent;

    constructor() {
        this.analyzer = new RuleBasedFailureAnalyzerAgent();
    }

    async execute(
        input: FailureAnalysisToolInput
    ): Promise<FailureAnalysis> {

        return this.analyzer.analyze(
            input.failureTest,
            input.category
        );
    }
}