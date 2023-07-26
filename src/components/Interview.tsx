import { useSelector } from "react-redux";
import { JobApply, JobState } from "../types/reducersTypes";
import { useEffect, useState } from "react";
import { GptResponse } from "../utils/GptResponse";
import { getGptContext } from "../utils/gptContext";
import { useRecord } from "../hooks/useRecord";

export const Interview = () => {
  const { loading, startRecording, stopRecording, audio } = useRecord();

  const job: JobApply = useSelector((state: JobState) => state.job);
  const { jobPosition, yearsExperience, language } = job;

  const [aiResponse, setAiResponse] = useState<string>("");
  const [myResponse, setMyResponse] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);

  const gptResponse = new GptResponse(
    getGptContext(jobPosition, yearsExperience.toString(), language)
  );

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);

    const response = await gptResponse.getResponse(myResponse);
    setAiResponse(response);
    setLoad(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setMyResponse(value);
  };

  const firstPrompt = async () => {
    setLoad(true);
    const response = await gptResponse.getResponse("Hello, how are you?");
    setAiResponse(response);
    setLoad(false);
  };

  useEffect(() => {
    firstPrompt();
  }, []);

  useEffect(() => {
    if (audio) {
      const objectAudio = URL.createObjectURL(audio);
      const audioElement = new Audio(objectAudio);

      audioElement.play();
    }
  }, [audio]);

  return (
    <form className="p-5 mt-56" onSubmit={submit}>
      <div className="mb-6">
        <textarea
          value={load ? "Loading..." : aiResponse}
          id="gpt-response"
          className="w-full bg-zinc-200 border-2 border-zinc-200 rounded-md py-2 px-4 text-sm font-medium text-gray-600 h-full"
          disabled
          rows={8}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="response"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Type your response
        </label>
        <textarea
          placeholder="Response"
          className="w-full bg-zinc-200 border-2 border-zinc-200 rounded-md py-2 px-4 text-sm font-medium text-gray-600"
          id="response"
          value={myResponse}
          onChange={handleChange}
          rows={3}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md w-full text-sm font-medium"
        type="submit"
      >
        Send
      </button>
      <button
        className={
          loading
            ? "bg-red-500 text-white px-4 py-2 mt-4 rounded-md w-full text-sm font-medium"
            : "bg-green-500 text-white px-4 py-2 mt-4 rounded-md w-full text-sm font-medium"
        }
        type="button"
        onClick={loading ? stopRecording : startRecording}
      >
        {loading ? "Stop" : "Record"}
      </button>
    </form>
  );
};
