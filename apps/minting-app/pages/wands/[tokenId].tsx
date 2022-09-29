import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { useContractRead } from "wagmi";
import WandView from "../../components/WandView";
import Layout from "../../components/Layout";
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

  const { data, isError, isLoading } = useContractRead({
    addressOrName: wandContract.address,
    contractInterface: wandContract.abi,
    functionName: "tokenURI",
    args: tokenId,
    enabled: !!tokenId,
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <Layout description="Zodiac Wands Minting App">
      <div className={styles.centerContainer}>
        {mounted && data && <WandView tokenUri={data as unknown as string} />}
      </div>
    </Layout>
  );
};

export default WandsPage;
