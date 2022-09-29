import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { useContractReads } from "wagmi";
import WandView from "../../components/WandView";
import Layout from "../../components/Layout";
import {
  FullDownloadButton,
  PFPDownloadButton,
} from "../../components/DownloadButton";

import styles from "../../styles/Home.module.css";
import wandContract from "../../utils/contract";
import { useAppContext } from "../../state";
import { MintStage } from "../../types";

const WandsPage: NextPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  // // temp workaround for SRR hydration issue
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const contract = {
    addressOrName: wandContract.address,
    contractInterface: wandContract.abi,
  };

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      { ...contract, functionName: "tokenURI", args: tokenId },
      { ...contract, functionName: "ownerOf", args: tokenId },
    ],
    enabled: !!tokenId,
    onSuccess(data) {
      console.log("success", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <Layout description="Zodiac Wands Minting App">
      {mounted && data && (
        <WandView
          tokenUri={data as unknown as string}
          tokenId={tokenId as unknown as string}
        />
      )}
      <div className={styles.downloadButtons}>
        <FullDownloadButton />
        <PFPDownloadButton />
      </div>
    </Layout>
  );
};

export default WandsPage;
