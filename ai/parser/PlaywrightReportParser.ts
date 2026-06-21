import * as fs from "fs";
import { ReportParser } from "../contracts/ReportParser";
import { FailureTest } from "../models/FailureTest";
import { AnsiTextCleaner } from "../../utils/text/AnsiTextCleaner";

export class PlaywrightReportParser implements ReportParser {

    async parse(reportPath: string): Promise<FailureTest[]> {
        const reportContent = fs.readFileSync(reportPath, "utf-8");
        const reportJson = JSON.parse(reportContent);
        const failedTests: FailureTest[] = [];
        this.extractFailedTests(reportJson.suites || [], failedTests);
        return failedTests;
    }

    private extractFailedTests(suites: any[], failedTests: FailureTest[]): void {
        for (const suite of suites) {
            if (suite.specs) {
                for (const spec of suite.specs) {
                    for (const test of spec.tests || []) {
                        const failedResult = test.results?.find((result: any) => result.status === "failed" || result.status === "timedOut");
                        if (failedResult) {
                            failedTests.push({
                                testName: spec.title,
                                status: failedResult.status,
                                errorMessage: AnsiTextCleaner.clean(
                                    failedResult.error?.message || ""
                                ),

                                stackTrace: AnsiTextCleaner.clean(
                                    failedResult.error?.stack || ""
                                ),
                                durationMs:
                                    failedResult.duration || 0,
                                screenshotPath:
                                    failedResult.attachments?.find(
                                        (attachment: any) =>
                                            attachment.name === "screenshot"
                                    )?.path
                            });
                        }
                    }
                }
            }
            if (suite.suites?.length) {
                this.extractFailedTests(
                    suite.suites,
                    failedTests
                );
            }
        }
    }
}