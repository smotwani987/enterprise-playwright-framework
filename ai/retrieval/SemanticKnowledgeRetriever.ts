
export class SemanticKnowledgeRetriever{
    async search(error:string){
        const normalised=error.toLowerCase();
        if (normalised.includes('locator')||normalised.includes('element')||normalised.includes('selector')){
            return {rootCause:'Locator issue', fix: 'Verify selector'}
        }
        if (normalised.includes('timeout')||normalised.includes('wait')){
            return {rootCause:'Timeout issue', fix: 'Increase Wait Time'}
        }
        return {rootCause:'Unknown',fix:'Manual analysis required'};
    }
}