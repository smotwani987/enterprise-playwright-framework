import { ChromaClient, Collection } from "chromadb";

export class VectorStore {
    private client = new ChromaClient({
        host: "localhost",
        port: 8000,
        ssl: false
    });
    private collection!: Collection;

        async initialize() {
    try {
        this.collection = await this.client.getCollection({
            name: "failure-patterns",
            //embeddingFunction: null
        });
    } catch {
        this.collection = await this.client.createCollection({
            name: "failure-patterns",
            embeddingFunction: null
        });
    }
}

    async add(id: string, document: string, embedding: number[]) {
        await this.collection.add({
            ids: [id],
            documents: [document],
            embeddings: [embedding]
        });
    }

    async search(queryEmbedding: number[], topK = 3) {
        return this.collection.query({
            queryEmbeddings: [queryEmbedding],
            nResults: topK
        });
    }
}