import { FailureAnalysisOrchestrator } from "./orchestrators/FailureAnalysisOrchestrator";
import { LMStudioProvider } from "./providers/LMStudioProvider.ts";

(async () => {
  const ai = new LMStudioProvider();
  const orchestrator = new FailureAnalysisOrchestrator();

  const result = await orchestrator.analyze({
    testName: "Login Test",
    errorMessage:
      "Locator not found: [data-testid='login-btn']",
    browser: "chromium",
    specFile: "login.spec.ts"
  });

  console.log(result);
})();