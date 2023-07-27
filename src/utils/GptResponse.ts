import axios from "axios";
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

  async getTranscription(audio: File): Promise<string> {
    const audioStream = new FileReader();
    audioStream.readAsArrayBuffer(audio);

    const data = new FormData();

    data.append("file", audio);
    data.append("model", "whisper-1");
    data.append("language", "en");

    const response = await axios({
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.openai.com/v1/audio/transcriptions",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
    return response.data.text;
  }
}
