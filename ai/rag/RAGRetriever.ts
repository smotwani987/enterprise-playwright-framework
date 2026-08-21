import { EmbeddingService } from "./EmbeddingService";
import { VectorStore } from "./VectorStore";

export class RAGRetriever {

    private vectorStore = new VectorStore();

    async initialize() {
        await this.vectorStore.initialize();
    }

    async retrieve(query: string): Promise<string[]> {

        const embedding = await EmbeddingService.generateEmbedding(query);

        const result = await this.vectorStore.search(embedding);

        return (result.documents?.[0] ?? []).filter((doc): doc is string => doc !== null);
    }
}