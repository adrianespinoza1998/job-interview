export class Speaker {
  speaker: SpeechSynthesisUtterance;

  constructor() {
    this.speaker = new SpeechSynthesisUtterance();

    speechSynthesis.getVoices().forEach((voice) => {
      console.log(voice.name, voice.lang);
    });
  }

  speak(text: string, language: string = "en-US") {
    this.speaker.text = text;
    this.speaker.lang = language;
    speechSynthesis.speak(this.speaker);
  }
}
