import type { NextPage } from "next";
import React, { Fragment, useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";
import Layout from "../../components/Layout";
import WandGrid from "../../components/WandGrid";
import styles from "../../styles/Home.module.css";

import wandContract from "../../utils/contract";
import useInfiniteScroll from "react-infinite-scroll-hook";
import IconButton from "../../components/IconButton";

const WandsPage: NextPage = () => {
  const { data, fetchNextPage, isLoading } = useContractInfiniteReads({
    cacheKey: "mintedWands",
    ...paginatedIndexesConfig(
      (index = 0) => ({
        addressOrName: wandContract.address,
        contractInterface: wandContract.abi,
        functionName: "tokenURI",
        args: [index],
      }),
      { start: 0, perPage: 18, direction: "increment" }
    ),
    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const isLastPage = data?.pages?.some((page) => page.includes(null));
  console.log({ isLoading, isLastPage });
  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: !isLastPage,
    onLoadMore: fetchNextPage,

    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: "0px 0px 100px 0px",
  });

  // temp workaround for SRR hydration issue
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const allWands = data?.pages?.flat() || ([] as string[]);

  return (
    <Layout description="Zodiac Wands Minting App">
      {mounted && (
        <div className={styles.centerContainer}>
          <WandGrid wands={allWands} />

          {(isLoading || !isLastPage) && (
            <div ref={sentryRef} style={{ width: 50, margin: "16px auto" }}>
              <IconButton icon="Linear" isLoading />
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default WandsPage;
