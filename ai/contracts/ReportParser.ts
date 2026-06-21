import { FailureTest } from "../models/FailureTest";
export interface ReportParser {

    parse(reportPath: string): Promise<FailureTest[]>;
}