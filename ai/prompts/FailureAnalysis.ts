import { FailureContext } from "../models/FailureContext";

export const buildFailurePrompt = (
  context: FailureContext, knowledge:string): string => `
You are a Playwright automation expert.

Known QA Knowledge:

${knowledge}

Analyze this test failure.

Test:
${context.testName}

Error:
${context.errorMessage}

Return ONLY valid JSON.

Example:

{
  "rootCause": "Locator not found",
  "fix": "Verify selector",
  "confidence": 95
}

Rules:
- Return JSON only
- No markdown
- No explanations
- No think tags
- Confidence must be a number between 0 and 100
`;