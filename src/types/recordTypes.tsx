import { RecordAudio } from "../utils/RecordAudio";

export type IsRecord = {
  isRecording: boolean;
  recordAudio: RecordAudio | null;
};
