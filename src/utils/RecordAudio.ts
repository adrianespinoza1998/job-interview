export class RecordAudio {
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: any[] = [];

  constructor() {}

  startRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.mediaRecorder.addEventListener("dataavailable", (event) => {
            this.audioChunks.push(event.data);
          });

          this.mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
            this.audioChunks = [];

            resolve(audioBlob);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  stopRecording() {
    this.mediaRecorder?.stop();
  }
}
