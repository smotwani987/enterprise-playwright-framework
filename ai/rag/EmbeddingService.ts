import { pipeline } from "@xenova/transformers";

export class EmbeddingService {
    private static extractor: any;

    static async initialize() {
        if (!this.extractor) {
            this.extractor = await pipeline(
                "feature-extraction",
                "Xenova/all-MiniLM-L6-v2"
            );
        }
    }

    static async generateEmbedding(text: string): Promise<number[]> {
        await this.initialize();

        const output = await this.extractor(text, {
            pooling: "mean",
            normalize: true
        });

        return Array.from(output.data);
    }
}