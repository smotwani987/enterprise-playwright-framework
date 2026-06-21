import { TestInfo } from "@playwright/test";
import { FailureAnalysisOrchestrator } from "../orchestrators/FailureAnalysisOrchestrator";
import fs from "fs/promises";

//console.log("PWD:", process.cwd());

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
    console.log('========== AI RCA ==========');
    console.log('Root Cause:',analysis.rootCause);
    console.log('Fix:',analysis.fix);
    console.log('Confidence:',analysis.confidence);
    console.log('============================');

    await fs.mkdir(
      "playwright-report/ai-analysis",
      { recursive: true }
    );

    const report = `# AI Failure Analysis ## Root Cause ${analysis.rootCause} ## Fix ${analysis.fix} ## Confidence ${analysis.confidence}%`;
    
    console.log("Creating AI analysis directory...");
    await fs.mkdir("ai-analysis", {recursive: true});
    await fs.writeFile(
      `ai-analysis/${testInfo.title.replace(/\s+/g, "_")}.json`,
      JSON.stringify(analysis, null, 2)
    );

  }
}