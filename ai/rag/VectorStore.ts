import { ChromaClient, Collection } from "chromadb";

export class VectorStore {

    private client = new ChromaClient({
        host: "localhost",
        port: 8000,
        ssl: false
    });

    private collection!: Collection;

    async initialize(): Promise<void> {
        try {
            this.collection = await this.client.getCollection({
                name: "failure-patterns-v2"
            });
        } catch {
            this.collection = await this.client.createCollection({
                name: "failure-patterns-v2",
                embeddingFunction: null
            });
        }
    }

    async add(
        id: string,
        document: string,
        embedding: number[]
    ): Promise<void> {

        await this.collection.add({
            ids: [id],
            documents: [document],
            embeddings: [embedding]
        });
    }

    async search(
        queryEmbedding: number[],
        topK: number = 3
    ): Promise<string[]> {

        const result = await this.collection.query({
            queryEmbeddings: [queryEmbedding],
            nResults: topK
        });

        return (result.documents?.[0] ?? [])
            .filter((doc): doc is string => doc !== null);
    }
}