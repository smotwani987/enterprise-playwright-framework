import { LMStudioProvider } from "../providers/LMStudioProvider";
import { buildFailurePrompt } from "../prompts/FailureAnalysis";

export class FailureAnalysisOrchestrator{
    private ai=new LMStudioProvider();

    async analyze(context:any):Promise<string>{
        const prompt=buildFailurePrompt(context);
        return await this.ai.ask(prompt);
    }
};