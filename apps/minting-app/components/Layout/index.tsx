import classNames from "classnames";
import { ReactNode } from "react";
import { useAppContext } from "../../state";
import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";

import CornerGilding from "../Gilding/Corners";
import Nav from "../Nav";
import bgImage from "../../public/test-bg-small.jpg";
import styles from "./Layout.module.css";
import homeStyles from "../../styles/Home.module.css";
import { MintStage } from "../../types";

interface Props {
  children: ReactNode;
  description: string;
  className?: string;
}
const Layout: React.FC<Props> = ({ children, description, className }) => {
  const { state, dispatch } = useAppContext();
  const { stage } = state;

  const isMinting =
    stage == MintStage.SIGNING ||
    stage == MintStage.TRANSACTING ||
    stage == MintStage.SUCCESS;

  const mintingClasses = [
    homeStyles.animateOnMint,
    homeStyles.hasSvg,
    {
      [homeStyles.minting]: isMinting,
    },
  ];
  return (
    <div className={classNames(styles.container, className)}>
      <img
        src={bgImage.src}
        alt=""
        className={classNames(
          styles.backgroundImage,
          homeStyles.animateOnMint,
          {
            [styles.minting]: isMinting,
          }
        )}
      />
      <Head>
        <title>Minting App</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CornerGilding className={classNames(mintingClasses)} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
