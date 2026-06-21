import { PlaywrightReportReaderTool } from "../tools/PlaywrightReportReaderTool";
import { FailureClassificationTool } from "../tools/FailureClassificationTool";
import { FailureAnalysisTool } from "../tools/FailureAnalysisTool";
import { HtmlFailureReportGeneratorTool } from "../tools/HtmlFailureReportGeneratorTool";
import { FailureAnalysisReport } from "../models/FailureAnalysisReport";
import { FailureMemoryStore } from "../memory/FailureMemoryStore";

export class AIFailureReportOrchestrator {

    private readonly reportReaderTool: PlaywrightReportReaderTool;
    private readonly classificationTool: FailureClassificationTool;
    private readonly analysisTool: FailureAnalysisTool;
    private readonly htmlReportGeneratorTool: HtmlFailureReportGeneratorTool;
    private readonly failureMemoryStore: FailureMemoryStore;

    constructor() {
        this.reportReaderTool =
            new PlaywrightReportReaderTool();

        this.classificationTool =
            new FailureClassificationTool();

        this.analysisTool =
            new FailureAnalysisTool();

        this.htmlReportGeneratorTool =
            new HtmlFailureReportGeneratorTool();

        this.failureMemoryStore =
            new FailureMemoryStore();
    }

    async generate(
        reportPath: string,
        outputPath: string
    ): Promise<void> {

        const failedTests =
            await this.reportReaderTool.execute(reportPath);

        console.log(
            `Found ${failedTests.length} failed tests`
        );

        const analysisReports: FailureAnalysisReport[] = [];

        for (const test of failedTests) {

            const category =
                await this.classificationTool.execute(test);

            const analysis =
                await this.analysisTool.execute({
                    failureTest: test,
                    category
                });

            console.log("--------------------------------");
            console.log(`Test: ${test.testName}`);
            console.log(`Status: ${test.status}`);
            console.log(`Category: ${category}`);
            console.log(`Root Cause: ${analysis.rootCause}`);
            console.log(`Confidence: ${analysis.confidence}%`);

            const currentReport: FailureAnalysisReport = {
                testName: test.testName,
                status: test.status,
                durationMs: test.durationMs,
                errorMessage: test.errorMessage,
                category,
                analysis,
                originalFailure: test
            };

            const memoryMatch =
                this.failureMemoryStore.findMatchingMemory(currentReport);

            currentReport.memoryMatch =
                memoryMatch;

            analysisReports.push(currentReport);
        }

        await this.htmlReportGeneratorTool.execute({
            reports: analysisReports,
            outputPath
        });
        console.log(
            `AI HTML report generated: ${outputPath}`
        );


        this.failureMemoryStore.updateMemory(
            analysisReports
        );

        console.log(
            "Failure memory updated: ai/memory/failure-memory.json"
        );
    }
}