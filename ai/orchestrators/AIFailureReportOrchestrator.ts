import { FailureAnalysisReport } from "../models/FailureAnalysisReport";

import { ReportGeneratorAgent } from "../agents/ReportGeneratorAgent";
import { MemoryAgent } from "../agents/MemoryAgent";
import { ReportReaderAgent } from "../agents/ReportReaderAgent";
import { FailureClassifierAgent } from "ai/agents/FailureClassifierAgent";
import { FailureAnalyzerAgent } from "ai/agents/FailureAnalyzerAgent";

export class AIFailureReportOrchestrator {

    private readonly reportReaderAgent: ReportReaderAgent;
    private readonly failureClassifierAgent:FailureClassifierAgent;
    private readonly failureAnalyzerAgent:FailureAnalyzerAgent;
    private readonly reportGeneratorAgent: ReportGeneratorAgent;
    private readonly memoryAgent: MemoryAgent;

    constructor() {
        this.reportReaderAgent = new ReportReaderAgent();

        this.failureClassifierAgent=new FailureClassifierAgent();

        this.failureAnalyzerAgent=new FailureAnalyzerAgent();

        this.reportGeneratorAgent=new ReportGeneratorAgent();

        this.memoryAgent = new MemoryAgent();
    }

    async generate(
        reportPath: string,
        outputPath: string
    ): Promise<void> {

        const failedTests = await this.reportReaderAgent.execute(reportPath);

        console.log(`Found ${failedTests.length} failed tests`);

        const analysisReports: FailureAnalysisReport[] = [];

        for (const test of failedTests) {

            const category = await this.failureClassifierAgent.execute(test);

            const analysis =
                await this.failureAnalyzerAgent.execute({
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

            const memoryMatch = this.memoryAgent.findMatchingMemory(currentReport);

            currentReport.memoryMatch =
                memoryMatch;

            analysisReports.push(currentReport);
        }

        await this.reportGeneratorAgent.execute({reports: analysisReports,
            outputPath});

        console.log(
            `AI HTML report generated: ${outputPath}`
        );


        this.memoryAgent.updateMemory(analysisReports);

        console.log(
            "Failure memory updated: ai/memory/failure-memory.json"
        );
    }
}