import fs from "fs";
import path from "path";
import { FailureAnalysisReport } from "../models/FailureAnalysisReport";
import { FailureMemoryRecord } from "../models/FailureMemoryRecord";
import { FailureMemoryMatch } from "../models/FailureMemoryMatch";

export class FailureMemoryStore {

    private readonly memoryFilePath: string;

    constructor(
        memoryFilePath: string = "ai/memory/failure-memory.json"
    ) {
        this.memoryFilePath = memoryFilePath;
    }
    findMatchingMemory(
        report: FailureAnalysisReport
    ): FailureMemoryMatch {

        const existingMemory =
            this.loadMemory();

        const signature =
            this.createSignature(report);

        const matchedRecord =
            existingMemory.find(record =>
                record.errorSignature === signature
            );

        if (!matchedRecord) {
            return {
                isRecurring: false,
                occurrenceCount: 0
            };
        }

        return {
            isRecurring: true,
            occurrenceCount: matchedRecord.occurrenceCount,
            matchedRecord
        };
    }
    updateMemory(
        analysisReports: FailureAnalysisReport[]
    ): void {

        const existingMemory =
            this.loadMemory();

        for (const report of analysisReports) {

            const signature =
                this.createSignature(report);

            const existingRecord =
                existingMemory.find(record =>
                    record.errorSignature === signature
                );

            const now =
                new Date().toISOString();

            if (existingRecord) {
                existingRecord.occurrenceCount += 1;
                existingRecord.lastSeen = now;
            } else {
                existingMemory.push({
                    testName: report.testName,
                    category: report.category,
                    errorSignature: signature,
                    rootCause: report.analysis.rootCause,
                    suggestedFixes: report.analysis.suggestedFixes,
                    occurrenceCount: 1,
                    firstSeen: now,
                    lastSeen: now
                });
            }
        }

        this.saveMemory(existingMemory);
    }

    private loadMemory(): FailureMemoryRecord[] {

        if (!fs.existsSync(this.memoryFilePath)) {
            return [];
        }

        const fileContent =
            fs.readFileSync(this.memoryFilePath, "utf-8");

        if (!fileContent.trim()) {
            return [];
        }

        return JSON.parse(fileContent) as FailureMemoryRecord[];
    }

    private saveMemory(
        records: FailureMemoryRecord[]
    ): void {

        const dir =
            path.dirname(this.memoryFilePath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(
            this.memoryFilePath,
            JSON.stringify(records, null, 2),
            "utf-8"
        );
    }

    private createSignature(
        report: FailureAnalysisReport
    ): string {

        return [
            report.testName,
            report.category,
            report.analysis.rootCause
        ].join("::");
    }
}