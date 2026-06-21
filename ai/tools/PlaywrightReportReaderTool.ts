import { AgentTool } from "./AgentTool";
import { FailureTest } from "../models/FailureTest";
import { PlaywrightReportParser } from "../parser/PlaywrightReportParser";

export class PlaywrightReportReaderTool implements AgentTool<string, FailureTest[]> {

    name = "PlaywrightReportReaderTool";

    private readonly parser: PlaywrightReportParser;

    constructor() {
        this.parser = new PlaywrightReportParser();
    }

    async execute(reportPath: string): Promise<FailureTest[]> {

        return await this.parser.parse(reportPath);
    }
}