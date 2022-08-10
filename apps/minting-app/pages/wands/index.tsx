import type { NextPage } from "next";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";
import { useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";
import ConnectAccount from "../../components/ConnectButton";
import { useAppContext } from "../../state";
import styles from "../../styles/Home.module.css";
import CornerGilding from "../../components/Gilding/Corners";
import wandContract from "../../utils/contract";
import bgImage from "../../public/test-bg-small.jpg";

const WandsPage: NextPage = () => {
  const { data, fetchNextPage } = useContractInfiniteReads({
    cacheKey: "mintedWands",
    ...paginatedIndexesConfig(
      (index = 0) => ({
        addressOrName: wandContract.address,
        contractInterface: wandContract.iface,
        functionName: "tokenURI",
        args: [index],
      }),
      { start: 0, perPage: 1, direction: "increment" }
    ),
    onSettled(data) {
      console.log("Settled", data);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      console.log("error", error);
    },
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
        wands -___-
        {mounted &&
          data?.pages.map((tokenUris, i) => (
            <Fragment key={i}>
              {tokenUris.map(
                (tokenUri, j) =>
                  tokenUri && (
                    <img src={getImageUri(tokenUri)} key={j} height={150} />
                  )
              )}
            </Fragment>
          ))}
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
