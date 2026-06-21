import { AgentTool } from "./AgentTool";
import { FailureAnalysisReport } from "../models/FailureAnalysisReport";
import { HtmlFailureReportGenerator } from "../reporter/HtmlFailureReportGenerator";

export interface HtmlFailureReportGeneratorToolInput {
    reports: FailureAnalysisReport[];
    outputPath: string;
}

export class HtmlFailureReportGeneratorTool
    implements AgentTool<HtmlFailureReportGeneratorToolInput, void> {

    name = "HtmlFailureReportGeneratorTool";

    private readonly reportGenerator: HtmlFailureReportGenerator;

    constructor() {
        this.reportGenerator = new HtmlFailureReportGenerator();
    }

    async execute(
        input: HtmlFailureReportGeneratorToolInput): Promise<void> {

        this.reportGenerator.generate(
            input.reports,
            input.outputPath
        );
    }
}