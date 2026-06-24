# Enterprise Playwright Framework

An enterprise-grade Playwright TypeScript automation framework built for UI testing, API testing, reporting, framework scalability, and AI-ready failure analysis.

This framework is designed to demonstrate how a modern QA automation framework can evolve beyond test execution into intelligent failure classification, root-cause analysis, recurring failure memory, and agent-style orchestration.

---

## Project Overview

This framework includes:

* Playwright TypeScript test automation
* UI automation using Page Object Model
* API test automation
* Custom fixtures
* Environment-based configuration
* JSON and HTML reporting
* AI-ready failure analysis pipeline
* Tool-based architecture
* Memory-based recurring failure detection
* Multi-agent style orchestration
* Custom HTML AI failure analysis report

The current AI layer is rule-based and architecture-ready for LLM integration. The next planned phase is to integrate an LLM-based failure analyzer using local or cloud LLM providers.

---

## Tech Stack

* Playwright
* TypeScript
* Node.js
* tsx
* JSON reporting
* HTML reporting
* Custom AI-style analysis modules

---

## Framework Capabilities

### Core Automation

* UI test automation
* API test automation
* Page Object Model design
* Reusable fixtures
* Environment configuration
* Smoke and regression test organization
* Playwright HTML report generation
* JSON report generation for machine-readable analysis

---

## AI-Ready Failure Analysis

The framework includes a custom AI-ready failure analysis pipeline.

### Flow

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

## Current AI Architecture

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
├── package.json
└── tsconfig.json
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

### Generate AI failure analysis report

```bash
npm run ai:failure-report -- "reports/json/EPF_Report_2026-06-15_17-04-23.json"
```

The generated AI failure report will be available at:

```text
reports/ai-analysis/ai-failure-analysis-report.html
```

---

## Example AI Report Output

The AI failure report provides information such as:

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
* Modular AI-ready components
* Tool-based execution
* Agent-style orchestration
* Memory-based failure learning
* Clean reporting for stakeholders

---

## Current Status

Completed:

* Playwright TypeScript framework
* UI and API test support
* Report parser
* Failure classifier
* Rule-based failure analyzer
* Context-aware pattern matching
* HTML AI failure report
* Tool-calling style architecture
* Memory V1
* Multi-agent V1 structure

Planned:

* LLM-based failure analyzer
* Screenshot and trace analysis
* CI integration for automatic AI report generation
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

---

## Summary

This project demonstrates how a traditional Playwright automation framework can be extended into an AI-ready QA engineering platform.

It does not only execute tests. It also parses failures, classifies them, analyzes root causes, detects recurring issues, and generates a clean HTML failure analysis report using a tool-based, multi-agent style architecture.
