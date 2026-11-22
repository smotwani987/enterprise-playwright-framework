import { EmbeddingService } from "./EmbeddingService";
import { VectorStore } from "./VectorStore";

export class RAGRetriever {

    private readonly vectorStore: VectorStore;

    constructor() {
        this.vectorStore = new VectorStore();
    }

    async initialize(): Promise<void> {
        await this.vectorStore.initialize();
    }

    async retrieve(
        query: string,
        topK: number = 3
    ): Promise<string[]> {

        const embedding =
            await EmbeddingService.generateEmbedding(query);

        return await this.vectorStore.search(
            embedding,
            topK
        );
    }
}