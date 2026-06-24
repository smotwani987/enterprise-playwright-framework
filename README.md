# Enterprise Playwright Framework

An enterprise-grade Playwright TypeScript automation framework built for UI testing, API testing, reporting, cloud-ready execution, and AI-ready failure analysis.

This framework demonstrates how a modern QA automation framework can evolve beyond test execution into structured failure classification, root-cause analysis, recurring failure memory, tool-based orchestration, and multi-agent style workflow design.

> Current AI layer is rule-based and AI-ready. LLM-based reasoning is planned as the next phase.

---

## Project Overview

This framework includes:

* Playwright TypeScript automation
* UI test automation
* API test automation
* Page Object Model design
* Custom fixtures
* Environment-based configuration
* JSON and HTML reporting
* Azure Playwright Service configuration
* GitHub Actions pipeline support
* AI-ready failure analysis pipeline
* Tool-calling style architecture
* Memory-based recurring failure detection
* Multi-agent style orchestration
* Custom HTML AI failure analysis report

---

## Tech Stack

* Playwright
* TypeScript
* Node.js
* tsx
* Azure Playwright Service / Playwright Workspaces
* Azure Identity
* GitHub Actions
* JSON reporting
* HTML reporting
* Custom AI-style analysis modules

---

## Framework Capabilities

### Core Automation

* UI test automation
* API test automation
* Page Object Model structure
* Reusable fixtures
* Environment-based test execution
* Smoke and regression test organization
* Playwright HTML report generation
* Playwright JSON report generation for machine-readable analysis

---

## Azure Playwright Service Integration

This framework includes configuration support for running Playwright tests with Azure Playwright Service / Playwright Workspaces.

The Azure service configuration is maintained separately from the default local Playwright configuration so that tests can be executed either locally or through Azure-managed cloud browsers when required.

### Azure Configuration File

```text
playwright.service.config.ts
```

This file extends the base Playwright configuration and adds Azure Playwright Service capabilities such as:

* Azure Playwright configuration using `createAzurePlaywrightConfig`
* Linux-based cloud execution configuration
* Azure authentication using `DefaultAzureCredential`
* Azure Playwright reporter integration
* HTML reporter support along with Azure reporting

### Purpose

The Azure Playwright setup is useful for:

* Running tests on managed cloud browsers
* Scaling browser execution beyond local machine capacity
* Publishing test results and artifacts to Azure Playwright reporting
* Validating Playwright tests in a cloud-supported execution environment
* Preparing the framework for enterprise CI/CD execution

### Local Playwright Execution

```bash
npm run test:qa
```

### Azure Playwright Service Execution

```bash
npx playwright test --config=playwright.service.config.ts
```

### Reporting

The Azure Playwright configuration supports:

* Playwright HTML report
* Azure Playwright reporter
* Test artifacts and execution results for cloud-based analysis

This keeps the framework flexible for both local execution and cloud-scale validation.

---

## AI-Ready Failure Analysis

The framework includes a custom AI-ready failure analysis pipeline.

### High-Level Flow

```text
Playwright JSON Report
        ↓
ReportReaderAgent
        ↓
FailureClassifierAgent
        ↓
FailureAnalyzerAgent
        ↓
MemoryAgent
        ↓
ReportGeneratorAgent
        ↓
HTML AI Failure Analysis Report
```

---

## AI Failure Analysis Features

### 1. Report Parsing

Reads Playwright JSON reports and extracts failed tests into structured objects.

```text
Playwright JSON
↓
PlaywrightReportParser
↓
FailureTest[]
```

### 2. Failure Classification

Classifies failures into meaningful categories such as:

* ASSERTION_FAILURE
* LOCATOR_FAILURE
* TIMEOUT_FAILURE
* API_FAILURE
* UNKNOWN_FAILURE

### 3. Context-Aware Analysis

Uses error messages, stack traces, and known failure patterns to identify likely root causes and suggested fixes.

### 4. Knowledge Base

Failure patterns are maintained separately in a JSON knowledge base.

```text
ai/knowledge-base/failure-patterns.json
```

### 5. Memory

The framework stores recurring failure information in memory.

It tracks:

* Test name
* Failure category
* Root cause
* Error signature
* Occurrence count
* First seen date
* Last seen date
* Suggested fixes

### 6. HTML AI Failure Report

Generates a clean HTML report showing:

* Total failures
* Failure category summary
* Root cause
* Confidence score
* Suggested fixes
* Recurring failure status
* Previous occurrence count
* Error details

Output:

```text
reports/ai-analysis/ai-failure-analysis-report.html
```

---

## Current AI-Ready Architecture

```text
ai
├── agents
│   ├── Agent.ts
│   ├── ReportReaderAgent.ts
│   ├── FailureClassifierAgent.ts
│   ├── FailureAnalyzerAgent.ts
│   ├── MemoryAgent.ts
│   └── ReportGeneratorAgent.ts
│
├── analyzer
│   ├── FailurePatternLoader.ts
│   ├── FailurePatternMatcher.ts
│   └── RuleBasedFailureAnalyzerAgent.ts
│
├── classifier
│   └── RuleBasedFailureClassifier.ts
│
├── contracts
│   ├── ReportParser.ts
│   ├── FailureClassifier.ts
│   └── FailureAnalyzerAgent.ts
│
├── knowledge-base
│   └── failure-patterns.json
│
├── memory
│   ├── FailureMemoryStore.ts
│   └── failure-memory.json
│
├── models
│   ├── FailureTest.ts
│   ├── FailureCategory.ts
│   ├── FailureAnalysis.ts
│   ├── FailureAnalysisReport.ts
│   ├── FailurePattern.ts
│   ├── FailureMemoryRecord.ts
│   └── FailureMemoryMatch.ts
│
├── orchestrators
│   └── AIFailureReportOrchestrator.ts
│
├── parser
│   └── PlaywrightReportParser.ts
│
├── reporter
│   └── HtmlFailureReportGenerator.ts
│
├── runner
│   └── generate-ai-failure-report.ts
│
└── tools
    ├── AgentTool.ts
    ├── PlaywrightReportReaderTool.ts
    ├── FailureClassificationTool.ts
    ├── FailureAnalysisTool.ts
    └── HtmlFailureReportGeneratorTool.ts
```

---

## Project Structure

```text
enterprise-playwright-framework
│
├── ai
│   ├── agents
│   ├── analyzer
│   ├── classifier
│   ├── contracts
│   ├── knowledge-base
│   ├── memory
│   ├── models
│   ├── orchestrators
│   ├── parser
│   ├── reporter
│   ├── runner
│   └── tools
│
├── config
├── fixtures
├── pages
├── reports
│   ├── ai-analysis
│   └── json
│
├── tests
│   ├── api
│   └── ui
│
├── utils
├── playwright-report
├── test-results
├── playwright.config.ts
├── playwright.service.config.ts
├── package.json
└── tsconfig.json
```

---

## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Commands

### Run QA tests

```bash
npm run test:qa
```

### Run DEV tests

```bash
npm run test:dev
```

### Run Azure Playwright Service tests

```bash
npx playwright test --config=playwright.service.config.ts
```

### Generate AI-ready failure analysis report

```bash
npm run ai:failure-report -- "reports/json/EPF_Report_2026-06-15_17-04-23.json"
```

The generated AI-ready failure report will be available at:

```text
reports/ai-analysis/ai-failure-analysis-report.html
```

---

## Example AI-Ready Report Output

The custom HTML report provides analysis such as:

```text
Test: TC10 - Verify My Action Widget Visibility
Category: LOCATOR_FAILURE
Root Cause: Page navigation did not complete before the test attempted validation or interaction.
Confidence: 85%
Recurring Failure: Yes
Previous Occurrences: 3

Suggested Fixes:
- Wait for page navigation to complete before interacting with elements
- Use page.waitForURL() for expected route changes
- Avoid asserting dashboard elements immediately after login submit
```

---

## Design Principles

This framework follows:

* Separation of concerns
* Page Object Model
* Reusable fixtures
* Environment-based execution
* Modular AI-ready components
* Tool-based execution
* Agent-style orchestration
* Memory-based failure learning
* Clean reporting for stakeholders
* Cloud-ready Playwright execution using Azure configuration

---

## Current Status

Completed:

* Playwright TypeScript framework
* UI and API test support
* Page Object Model structure
* Custom fixtures
* Environment-based configuration
* Playwright HTML reporting
* JSON reporting for machine-readable analysis
* Azure Playwright Service configuration
* Azure Playwright reporter setup
* GitHub Actions pipeline for Playwright execution
* Report parser
* Failure classifier
* Rule-based failure analyzer
* Context-aware pattern matching
* HTML AI-ready failure report
* Tool-calling style architecture
* Memory V1
* Multi-agent V1 structure

Planned:

* CI execution using `playwright.service.config.ts`
* LLM-based failure analyzer
* Screenshot and trace analysis
* Automatic AI report generation after CI execution
* Slack or Jira publishing
* Advanced memory using embeddings or vector search

---

## Future Enhancements

Planned next phase:

```text
RuleBasedFailureAnalyzerAgent
        ↓
LLMFailureAnalyzerAgent
        ↓
LLM-enhanced root cause analysis
```

This will allow the framework to use an LLM to reason over:

* Error message
* Stack trace
* Failure category
* Known failure patterns
* Historical memory
* Suggested fixes

Additional future enhancements:

* Screenshot analysis
* Playwright trace analysis
* Video evidence analysis
* CI/CD integration for automatic AI-ready report generation
* Azure-based test execution in CI
* Jira defect creation
* Slack notification publishing
* Embedding-based memory search
* RAG-based failure knowledge retrieval

---

## Summary

This project demonstrates how a traditional Playwright automation framework can be extended into an AI-ready QA engineering platform.

It does not only execute tests. It also parses failures, classifies them, analyzes likely root causes, detects recurring issues, and generates a clean HTML failure analysis report using a tool-based, multi-agent style architecture.

The current implementation is rule-based and AI-ready. The next planned phase is to integrate an LLM-based analyzer to enable deeper reasoning over failures, logs, traces, screenshots, and historical memory.
