import { LMStudioProvider } from "../providers/LMStudioProvider";
import { buildFailurePrompt } from "../prompts/FailureAnalysis";
import { FailureAnalysisResult } from "../models/FailureAnalysisResult";
import { FailureContext } from "ai/models/FailureContext";
import { KnowledgeRetriever } from '../retrieval/KnowledgeRetriever';
import { SemanticKnowledgeRetriever } from "ai/retrieval/SemanticKnowledgeRetriever";

export class FailureAnalysisOrchestrator {
    private ai = new LMStudioProvider();
    private retriever = new SemanticKnowledgeRetriever();
    async analyze(context: FailureContext): Promise<FailureAnalysisResult> {
        const retriever = new SemanticKnowledgeRetriever();
        console.log('++++++++++++++' + context.errorMessage);
        console.log('--------------++++++++++++++' + context.stackTrace);
        const searchText = `${context.errorMessage}
${context.stackTrace ?? ''}`;

        console.log('=== SEARCH TEXT ===');
        console.log(searchText);
        console.log('===================');

        const knowledge = await this.retriever.search(searchText);
        //const knowledge = await this.retriever.findRelevantKnowledge(`${context.errorMessage}${context.stackTrace ?? ''}`);
        console.log('=== RETRIEVED KNOWLEDGE ===');
        console.log(knowledge);
        console.log('===========================');
        
        const knowledgeText=`Known Root Cause: ${knowledge.rootCause}
        Known Fix: ${knowledge.fix}`;
        const prompt = buildFailurePrompt(context, knowledgeText);
        const response = await this.ai.ask(prompt);

        try {
            const cleaned = response
                .replace(/<think>[\s\S]*?<\/think>/g, "")
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();
            return JSON.parse(cleaned);

        } catch (error) {
            console.error("Failed to parse AI response:", response);
            return {
                rootCause: "Unable to parse AI response",
                fix: "Review failure manually",
                confidence: 0
            };
        }
    }
};