import { Agent } from "./Agent";
import { FailureTest } from "../models/FailureTest";
import { FailureCategory } from "../models/FailureCategory";
import { FailureAnalysis } from "../models/FailureAnalysis";
import { FailureAnalysisTool } from "../tools/FailureAnalysisTool";

export interface FailureAnalyzerAgentInput {
    failureTest: FailureTest;
    category: FailureCategory;
}

export class FailureAnalyzerAgent
    implements Agent<FailureAnalyzerAgentInput, FailureAnalysis> {

    name = "FailureAnalyzerAgent";

    private readonly analysisTool: FailureAnalysisTool;

    constructor() {
        this.analysisTool =
            new FailureAnalysisTool();
    }

    async execute(
        input: FailureAnalyzerAgentInput
    ): Promise<FailureAnalysis> {

        console.log(
            `${this.name}: Analyzing failure - ${input.failureTest.testName}`
        );

        return await this.analysisTool.execute({
            failureTest: input.failureTest,
            category: input.category
        });
    }
}