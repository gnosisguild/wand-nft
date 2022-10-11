import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useEffect } from "react";

import GreenlistForm from "../components/greenlistForm";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current!.playbackRate = 0.7;
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Zodiac Portal</title>
        <meta name="description" content="G҉ᴗG҉━━✫・*。.  *  ·   . ✵ " />
      </Head>

      <main className={styles.main}>
        <div className={styles.background}>
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            loop
            poster="/firstFrame.jpg"
          >
            <source src="/bg2.mp4" type="video/mp4" />
          </video>
        </div>
        <GreenlistForm />
      </main>
    </div>
  );
};

export default Home;
