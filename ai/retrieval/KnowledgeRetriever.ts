import fs from 'fs/promises';
import path from 'path';

export class KnowledgeRetriever {

  async findRelevantKnowledge(errorMessage: string): Promise<string> {
console.log('Searching for:', errorMessage);
    const kbPath = path.join(process.cwd(),'ai','knowledge-base');
    const files = await fs.readdir(kbPath);
    for (const file of files) {
      const content = await fs.readFile(path.join(kbPath, file),'utf-8');
      const entries = JSON.parse(content);
      for (const entry of entries) {
        console.log('Checking pattern:', entry.pattern);

        if (errorMessage.toLowerCase().includes(entry.pattern.toLowerCase())) {
         console.log('MATCH FOUND:', entry.pattern);
          return `
          Pattern: ${entry.pattern} 
          Root Cause:${entry.rootCause} 
          Fix:${entry.fix}`;
        }
        
      }
    }

    return 'No matching knowledge found.';
  }
}