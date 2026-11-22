import fs from "fs";
import path from "path";
import { EmbeddingService } from "./EmbeddingService";
import { VectorStore } from "./VectorStore";

interface FailurePattern {
    keywords: string[];
    category: string;
    rootCause: string;
    confidence: number;
    suggestedFixes: string[];
}

async function ingestPatterns(): Promise<void> {

    const filePath = path.join(
        process.cwd(),
        "ai/data/documents/failure-patterns.json"
    );

    const patterns: FailurePattern[] =
        JSON.parse(
            fs.readFileSync(filePath, "utf-8")
        );

    const vectorStore = new VectorStore();

    await vectorStore.initialize();

    for (let i = 0; i < patterns.length; i++) {

        const pattern = patterns[i];

        const document = [
            `Category: ${pattern.category}`,
            `Keywords: ${pattern.keywords.join(", ")}`,
            `Root Cause: ${pattern.rootCause}`,
            `Confidence: ${pattern.confidence}`,
            `Suggested Fixes: ${pattern.suggestedFixes.join(", ")}`
        ].join("\n");

        const embedding =
            await EmbeddingService.generateEmbedding(document);

        await vectorStore.add(
            `pattern-${i}`,
            document,
            embedding
        );

        console.log(
            `✅ Ingested ${pattern.category}`
        );
    }

    console.log(
        `\n✅ ${patterns.length} patterns ingested into ChromaDB.`
    );
}

ingestPatterns().catch(error => {
    console.error("❌ RAG ingestion failed:", error);
    process.exit(1);
});