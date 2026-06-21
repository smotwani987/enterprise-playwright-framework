import { Agent } from "./Agent";
import { FailureTest } from "../models/FailureTest";
import { PlaywrightReportReaderTool } from "../tools/PlaywrightReportReaderTool";

export class ReportReaderAgent
    implements Agent<string, FailureTest[]> {

    name = "ReportReaderAgent";

    private readonly reportReaderTool: PlaywrightReportReaderTool;

    constructor() {
        this.reportReaderTool =
            new PlaywrightReportReaderTool();
    }

    async execute(
        reportPath: string
    ): Promise<FailureTest[]> {

        console.log(
            `${this.name}: Reading Playwright report from ${reportPath}`
        );

        return await this.reportReaderTool.execute(reportPath);
    }
}