import fs from "fs";
import { FailurePattern } from "../models/FailurePattern";

export class FailurePatternLoader {

    load(patternFilePath: string): FailurePattern[] {

        const fileContent=fs.readFileSync(patternFilePath, "utf-8");
        return JSON.parse(fileContent) as FailurePattern[];
    }
}