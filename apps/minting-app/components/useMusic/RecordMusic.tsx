import { useEffect } from "react";
import * as Tone from "tone";

const RecordMusic: React.FC = () => {
  useEffect(() => {
    const recorder = new Tone.Recorder();
    Tone.Destination.connect(recorder);
    recorder.start();
    console.log("recording started");
    window.setTimeout(async () => {
      const recording = await recorder.stop();
      console.log("recording stopped");

      const url = URL.createObjectURL(recording);
      const anchor = document.createElement("a");
      anchor.download = "recording.webm";
      anchor.href = url;
      anchor.click();
    }, 10000);
  });

  return <></>;
};

export default RecordMusic;
