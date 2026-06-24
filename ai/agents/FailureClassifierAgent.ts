import { Agent } from "./Agent";
import { FailureTest } from "../models/FailureTest";
import { FailureCategory } from "../models/FailureCategory";
import { FailureClassificationTool } from "../tools/FailureClassificationTool";

export class FailureClassifierAgent
    implements Agent<FailureTest, FailureCategory> {

    name = "FailureClassifierAgent";

    private readonly classificationTool: FailureClassificationTool;

    constructor() {
        this.classificationTool =
            new FailureClassificationTool();
    }

    async execute(
        failureTest: FailureTest
    ): Promise<FailureCategory> {

        console.log(
            `${this.name}: Classifying failure - ${failureTest.testName}`
        );

        return await this.classificationTool.execute(failureTest);
    }
}