import { AIFailureReportOrchestrator } from "../orchestrators/AIFailureReportOrchestrator";

(async () => {

    const reportPath =
        process.argv[2];

    if (!reportPath) {
        throw new Error(
            "Please provide Playwright JSON report path. Example: npm run ai:failure-report -- \"reports/json/report.json\""
        );
    }

    const outputPath =
        "reports/ai-analysis/ai-failure-analysis-report.html";

    const orchestrator =
        new AIFailureReportOrchestrator();

    await orchestrator.generate(
        reportPath,
        outputPath
    );

})();