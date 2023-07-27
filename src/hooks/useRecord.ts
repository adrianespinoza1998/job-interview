import { useState } from "react";
import { RecordAudio } from "../utils/RecordAudio";

export const useRecord = () => {
  const [recordAudio] = useState<RecordAudio>(new RecordAudio());

  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const startRecording = () => {
    setLoading(true);
    recordAudio.startRecording().then((audioBlob) => {
      const file = new File([audioBlob], "audio.wav");

      setAudio(file);
    });
  };

  const stopRecording = async () => {
    recordAudio.stopRecording();
    setLoading(false);
  };

  return {
    startRecording,
    stopRecording,
    audio,
    loading,
  };
};
