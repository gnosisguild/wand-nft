import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { useContractRead } from "wagmi";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";

import wandContract from "../../utils/contract";

const WandsPage: NextPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const { data, isError, isLoading } = useContractRead({
    addressOrName: wandContract.address,
    contractInterface: wandContract.iface,
    functionName: "tokenURI",
    args: tokenId,
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
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
        <h1>{tokenId}</h1>
      </div>
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
