import { TestInfo } from "@playwright/test";
import { FailureAnalysisOrchestrator } from "../ai/orchestrators/FailureAnalysisOrchestrator";
import fs from "fs/promises";

export class AIFailureAnalyzer {
  static async analyze(testInfo: TestInfo) {
    if (testInfo.status === testInfo.expectedStatus) {
      return;
    }

    const orchestrator = new FailureAnalysisOrchestrator();

    const error = testInfo.errors?.[0];

    const analysis = await orchestrator.analyze({
      testName: testInfo.title,
      errorMessage: error?.message ?? "Unknown Error",
      stackTrace: error?.stack?.split('\n').slice(0, 10).join('\n'),
      browser: testInfo.project.name,
      specFile: testInfo.file
    });
    console.log('ANALYSIS RECEIVED');
    console.log(analysis);

    await fs.mkdir("playwright-report/ai-analysis", {
      recursive: true
    });

    await fs.writeFile(
      `playwright-report/ai-analysis/${testInfo.title.replace(/\s+/g, "_")}.md`,
      analysis
    );
  }
}