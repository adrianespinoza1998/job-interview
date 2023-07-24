import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

export class GptResponse {
  openai: OpenAIApi;
  context: string;
  messages: ChatCompletionRequestMessage[] = [];

  constructor(context: string) {
    this.context = context;

    const configuration = new Configuration({
      organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    });

    this.openai = new OpenAIApi(configuration);
  }

  async getResponse(prompt: string): Promise<string> {
    this.messages.push({ role: "user", content: prompt });

    const completion = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: this.context,
        },
        ...this.messages,
      ],
    });

    return completion.data.choices[0].message?.content || "";
  }
}
