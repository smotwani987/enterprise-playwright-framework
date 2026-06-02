import OpenAI from "openai";

export class LMStudioProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      baseURL: "http://localhost:1234/v1",
      apiKey: "lm-studio"
    });
  }

  async ask(prompt: string): Promise<string> {
    console.time("AI Analysis");

    try {
      const response = await this.client.chat.completions.create({
        model: "qwen-3-14b-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 100
      });

      console.log("LM Studio response received");

      const content =
        response.choices[0].message.content ?? "";

      console.log("========== AI RESPONSE ==========");
      console.log(content);
      console.log("=================================");

      return content;

    } catch (error) {
      console.error("LM Studio call failed:", error);
      throw error;
    } finally {
      console.timeEnd("AI Analysis");
    }
  }
}