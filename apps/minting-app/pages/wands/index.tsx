import type { NextPage } from "next";
import React, { Fragment, useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";
import Layout from "../../components/Layout";
import WandGrid from "../../components/WandGrid";
import styles from "../../styles/Home.module.css";

import wandContract from "../../utils/contract";

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
    <Layout description="Zodiac Wands Minting App">
      <div className={styles.centerContainer}>
        {mounted && <WandGrid wands={data?.pages} />}
      </div>
      {/* {mounted &&
          data?.pages.map((tokenUris, i) => (
            <Fragment key={i}>
              {tokenUris.map(
                (tokenUri, j) =>
                  tokenUri && (
                    <img src={getImageUri(tokenUri)} key={j} height={150} />
                  )
              )}
            </Fragment>
          ))} */}
    </Layout>
  );
};

export default WandsPage;

const getImageUri = (tokenUri: string) => {
  const json = atob(tokenUri.slice("data:application/json;base64,".length));
  if (!json) return "";
  const obj = JSON.parse(json);
  return obj.image;
};
