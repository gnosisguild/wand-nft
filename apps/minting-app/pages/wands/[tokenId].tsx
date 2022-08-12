import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";
import { useContractRead } from "wagmi";
import ConnectAccount from "../../components/ConnectButton";
import styles from "../../styles/Home.module.css";
import CornerGilding from "../../components/Gilding/Corners";
import wandContract from "../../utils/contract";
import bgImage from "../../public/test-bg-small.jpg";

const WandsPage: NextPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const { data, isError, isLoading } = useContractRead({
    addressOrName: wandContract.address,
    contractInterface: wandContract.iface,
    functionName: "tokenURI",
    args: tokenId,
  });

  // temp workaround for SRR hydration issue
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <Head>
        <title>Zodiac Wands</title>
        <meta name="description" content="Minting app for Zodiac NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CornerGilding />
        <div className={styles.centerContainer}>
          <h1>{tokenId}</h1>
        </div>
        <div className={styles.AccountConnect}>
          <ConnectAccount />
        </div>
      </main>
    </div>
  );
};

export default WandsPage;

const getImageUri = (tokenUri: string) => {
  const json = atob(tokenUri.slice("data:application/json;base64,".length));
  if (!json) return "";
  const obj = JSON.parse(json);
  return obj.image;
};
