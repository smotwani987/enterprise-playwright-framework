import { test } from "@playwright/test";
import { RAGRetriever } from "../ai/rag/RAGRetriever";

test("RAG Retrieval", async () => {

    const retriever = new RAGRetriever();
    await retriever.initialize();

    const results = await retriever.retrieve(
        "expect(locator).toBeVisible() failed element not found"
    );

    console.log(results);

});