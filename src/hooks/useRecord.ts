import { useEffect, useState } from "react";
import { RecordAudio } from "../utils/RecordAudio";

export const useRecord = () => {
  const [recordAudio] = useState<RecordAudio>(new RecordAudio());

  const [audio, setAudio] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const startRecording = () => {
    setLoading(true);
    recordAudio.startRecording().then((audioBlob) => {
      setAudio(audioBlob);
    });
  };

  const stopRecording = async () => {
    recordAudio.stopRecording();
    setLoading(false);
  };

  //   useEffect(() => {
  //     console.log("audio", audio);
  //     if (audio) {
  //       const audioUrl = URL.createObjectURL(audio);
  //       const audioElement = new Audio(audioUrl);
  //       audioElement.play();
  //     }
  //   }, [audio]);

  return {
    startRecording,
    stopRecording,
    audio,
    loading,
  };
};
