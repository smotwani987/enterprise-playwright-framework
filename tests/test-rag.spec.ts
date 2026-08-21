import { test } from '@playwright/test';
import { KnowledgeRetriever } from '../ai/retrieval/KnowledgeRetriever';

test('RAG Retrieval Test', async () => {
  const retriever = new KnowledgeRetriever();

  const result =
    await retriever.findRelevantKnowledge(
      'LOCATOR_FAILURE'
    );

  console.log(result);
});