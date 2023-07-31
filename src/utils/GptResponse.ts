import axios from "axios";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

export class GptResponse {
  openai: OpenAIApi;
  context: string;
  messages: ChatCompletionRequestMessage[] = [];
  language: string;

  constructor(context: string, language: string) {
    this.context = context;
    this.language = language;

    const configuration = new Configuration({
      organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    });

    this.openai = new OpenAIApi(configuration);
  }

  async getResponse(prompt: string): Promise<string> {
    this.messages.push({ role: "user", content: prompt });

    // const completion = await axios({
    //   method: "POST",
    //   url: "https://api.openai.com/v1/chat/completions",
    //   headers: {
    //     Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content: this.context,
    //       },
    //       ...this.messages,
    //     ],
    //   },
    // });

    // console.log(JSON.stringify(completion.data));

    // this.messages.push({
    //   role: "assistant",
    //   content: completion.data.choices[0].message.content || "",
    // });

    // return completion.data.choices[0].message.content || "";

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

    this.messages.push({
      role: "assistant",
      content: completion.data.choices[0].message?.content || "",
    });

    return completion.data.choices[0].message?.content || "";
  }

  async getTranscription(audio: File): Promise<string> {
    const data = new FormData();

    data.append("file", audio);
    data.append("model", "whisper-1");
    data.append("language", this.language === "english" ? "en" : "es");

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
