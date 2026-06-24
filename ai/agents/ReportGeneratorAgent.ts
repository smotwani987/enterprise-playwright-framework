import { Agent } from "./Agent";
import { FailureAnalysisReport } from "../models/FailureAnalysisReport";
import { HtmlFailureReportGeneratorTool } from "../tools/HtmlFailureReportGeneratorTool";

export interface ReportGeneratorAgentInput {
    reports: FailureAnalysisReport[];
    outputPath: string;
}

export class ReportGeneratorAgent
    implements Agent<ReportGeneratorAgentInput, void> {

    name = "ReportGeneratorAgent";

    private readonly htmlReportGeneratorTool: HtmlFailureReportGeneratorTool;

    constructor() {
        this.htmlReportGeneratorTool =
            new HtmlFailureReportGeneratorTool();
    }

    async execute(
        input: ReportGeneratorAgentInput
    ): Promise<void> {

        console.log(
            `${this.name}: Generating HTML AI failure report`
        );

        await this.htmlReportGeneratorTool.execute({
            reports: input.reports,
            outputPath: input.outputPath
        });
    }
}