import fs from "fs";
import path from "path";
import { FailureAnalysisReport } from "../models/FailureAnalysisReport";
import { FailureCategory } from "../models/FailureCategory";

export class HtmlFailureReportGenerator {

    generate(
        reports: FailureAnalysisReport[],
        outputPath: string
    ): void {

        const outputDir =
            path.dirname(outputPath);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const html =
            this.buildHtml(reports);

        fs.writeFileSync(outputPath, html, "utf-8");
    }

    private buildHtml(
        reports: FailureAnalysisReport[]
    ): string {

        const totalFailures =
            reports.length;

        const categoryCounts =
            this.getCategoryCounts(reports);

        const failureCards =
            reports
                .map(report => this.buildFailureCard(report))
                .join("\n");

        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>AI Failure Analysis Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
            margin: 0;
            padding: 24px;
            color: #1f2937;
        }

        .container {
            max-width: 1200px;
            margin: auto;
        }

        .header {
            background: #111827;
            color: white;
            padding: 24px;
            border-radius: 12px;
            margin-bottom: 24px;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
        }

        .header p {
            margin-top: 8px;
            color: #d1d5db;
        }

        .summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 24px;
        }

        .summary-card {
            background: white;
            padding: 18px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .summary-card h2 {
            margin: 0;
            font-size: 26px;
            color: #111827;
        }

        .summary-card p {
            margin: 6px 0 0;
            color: #6b7280;
        }

        .failure-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 18px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border-left: 6px solid #ef4444;
        }

        .failure-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 12px;
        }

        .meta {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 14px;
        }

        .badge {
            padding: 6px 10px;
            border-radius: 999px;
            font-size: 13px;
            font-weight: bold;
            background: #e5e7eb;
        }

        .category {
            background: #dbeafe;
            color: #1d4ed8;
        }

        .confidence {
            background: #dcfce7;
            color: #166534;
        }

        .root-cause {
            background: #f9fafb;
            padding: 14px;
            border-radius: 8px;
            margin: 12px 0;
        }

        .error {
            background: #111827;
            color: #f9fafb;
            padding: 14px;
            border-radius: 8px;
            white-space: pre-wrap;
            overflow-x: auto;
            font-family: monospace;
            font-size: 13px;
        }

        ul {
            margin-top: 8px;
        }

        li {
            margin-bottom: 6px;
        }
    </style>
</head>
<body>
<div class="container">

    <div class="header">
        <h1>AI Failure Analysis Report</h1>
        <p>Generated from Playwright JSON execution artifacts</p>
    </div>

    <div class="summary">
        <div class="summary-card">
            <h2>${totalFailures}</h2>
            <p>Total Failures</p>
        </div>

        ${Object.entries(categoryCounts)
                .map(([category, count]) => `
                <div class="summary-card">
                    <h2>${count}</h2>
                    <p>${category}</p>
                </div>
            `)
                .join("\n")}
    </div>

    ${failureCards}

</div>
</body>
</html>
        `;
    }

    private buildFailureCard(
        report: FailureAnalysisReport
    ): string {

        const fixes =
            report.analysis.suggestedFixes
                .map(fix => `<li>${this.escapeHtml(fix)}</li>`)
                .join("\n");
        const memoryInfo = this.buildMemoryInfo(report);
        return `
<div class="failure-card">

    <div class="failure-title">
        ${this.escapeHtml(report.testName)}
    </div>

    <div class="meta">
        <span class="badge">Status: ${this.escapeHtml(report.status)}</span>
        <span class="badge category">${report.category}</span>
        <span class="badge confidence">Confidence: ${report.analysis.confidence}%</span>
        <span class="badge">Duration: ${report.durationMs} ms</span>
    </div>
    ${memoryInfo}
    <div class="root-cause">
        <strong>Root Cause:</strong>
        <p>${this.escapeHtml(report.analysis.rootCause)}</p>
    </div>

    <strong>Suggested Fixes:</strong>
    <ul>
        ${fixes}
    </ul>

    <strong>Error Message:</strong>
    <div class="error">
${this.escapeHtml(report.errorMessage)}
    </div>

</div>
        `;

    }
    private buildMemoryInfo(
        report: FailureAnalysisReport
    ): string {

        if (!report.memoryMatch || !report.memoryMatch.isRecurring) {
            return `
<div class="root-cause">
    <strong>Recurring Failure:</strong>
    <p>No. This looks like a new failure pattern.</p>
</div>
        `;
        }

        const record =
            report.memoryMatch.matchedRecord;

        return `
<div class="root-cause">
    <strong>Recurring Failure:</strong>
    <p>Yes. This failure has been seen before.</p>
    <p><strong>Previous Occurrences:</strong> ${report.memoryMatch.occurrenceCount}</p>
    <p><strong>First Seen:</strong> ${record?.firstSeen}</p>
    <p><strong>Last Seen:</strong> ${record?.lastSeen}</p>
</div>
    `;
    }
    private getCategoryCounts(
        reports: FailureAnalysisReport[]
    ): Record<string, number> {

        return reports.reduce(
            (acc, report) => {
                acc[report.category] =
                    (acc[report.category] || 0) + 1;

                return acc;
            },
            {} as Record<FailureCategory, number>
        );
    }

    private escapeHtml(value: string): string {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}