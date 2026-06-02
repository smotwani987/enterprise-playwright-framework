import { FailureContext } from "../models/FailureContext";

export const buildFailurePrompt = (
  context: FailureContext
): string => `
Do not use <think> tags.
Do not show reasoning.
Provide only the final answer.

Playwright Failure:

Test: ${context.testName}

Error:
${context.errorMessage}

Format:

Root Cause:
<one sentence>

Fix:
<one sentence>

Maximum 50 words.
`;