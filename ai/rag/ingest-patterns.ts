import fs from "fs";
import path from "path";
import { EmbeddingService } from "./EmbeddingService";
import { VectorStore } from "./VectorStore";

async function ingestPatterns() {
    const filePath = path.join(
        __dirname,
        "../knowledge-base/failure-patterns.json"
    );

    const patterns = JSON.parse(
        fs.readFileSync(filePath, "utf-8")
    );

    const vectorStore = new VectorStore();
    await vectorStore.initialize();

    for (let i = 0; i < patterns.length; i++) {

        const pattern = patterns[i];

        const document = `
        Category: ${pattern.category}
        Keywords: ${pattern.keywords.join(", ")}
        Root Cause: ${pattern.rootCause}
        Suggested Fixes: ${pattern.suggestedFixes.join(", ")}
    `;

        const embedding =
            await EmbeddingService.generateEmbedding(document);

        await vectorStore.add(
            `pattern-${i}`,
            document,
            embedding
        );
    }

    console.log("✅ All patterns ingested into ChromaDB.");
}

ingestPatterns().catch(console.error);