import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import OuterSpace from "../../public/background-tracks/outer-space.mp3";
import RoyalLibrary from "../../public/background-tracks/royal-library.mp3";

interface BackgroundTrackProps {
  play: boolean;
}

const BackgroundMusic: React.FC<BackgroundTrackProps> = ({ play }) => {
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const player = useRef(null);
  let BackgroundTrack;

  const backgroundTracks = [
    {
      name: "space",
      volume: -25,
      audio: OuterSpace,
      filterRange: [100, 5000],
      filterType: "highpass",
    },
    {
      name: "royal-library",
      volume: -15,
      audio: RoyalLibrary,
      filterRange: [300, 6000],
    },
  ];

  const activeTrack =
    backgroundTracks[Math.floor(Math.random() * backgroundTracks.length)];

  useEffect(() => {
    BackgroundTrack = new Tone.ToneAudioBuffer(activeTrack.audio, () => {
      console.log(`loaded ${activeTrack.name}`);
    });

    setLoaded(true);
  }, [play]);

  useEffect(() => {
    if (!loaded) return;
    const filter = new Tone.Filter();
    if (activeTrack.filterRange) {
      filter.type = activeTrack.filterType || "lowpass";
      const lfo = new Tone.LFO(
        0.3,
        activeTrack.filterRange[0],
        activeTrack.filterRange[1]
      );
      lfo.connect(filter.frequency);
    }

    player.current = new Tone.Player(BackgroundTrack, () => {
      if (!ready) {
        player.loop = true;
        player.current.volume.value = activeTrack.volume;
        player.current.autostart = true;
        player.current.fadeIn = 1;
        player.current.fadeOut = 1;
        player.current.loop = true;

        setReady(true);
      }
    });

    player.current.connect(filter);
    filter.connect(Tone.Destination);
  }, [play]);

  useEffect(() => {
    if (!ready) return;
    if (play) {
      console.log(`starting background track: ${activeTrack.name}`);
      Tone.Transport.start();
    } else {
      console.log(`stopping background track: ${activeTrack.name}`);
      Tone.Transport.cancel();
      Tone.Transport.stop();
    }
  });

  return <></>;
};

export default BackgroundMusic;
