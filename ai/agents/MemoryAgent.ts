import { FailureAnalysisReport } from "../models/FailureAnalysisReport";
import { FailureMemoryMatch } from "../models/FailureMemoryMatch";
import { FailureMemoryStore } from "../memory/FailureMemoryStore";

export class MemoryAgent {

    name = "MemoryAgent";

    private readonly memoryStore: FailureMemoryStore;

    constructor() {
        this.memoryStore = new FailureMemoryStore();
    }

    findMatchingMemory(
        report: FailureAnalysisReport
    ): FailureMemoryMatch {

        console.log(
            `${this.name}: Checking memory for - ${report.testName}`
        );

        return this.memoryStore.findMatchingMemory(report);
    }

    updateMemory(
        reports: FailureAnalysisReport[]
    ): void {

        console.log(
            `${this.name}: Updating failure memory`
        );

        this.memoryStore.updateMemory(reports);
    }
}