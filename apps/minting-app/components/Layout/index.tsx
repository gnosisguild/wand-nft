import type { NextPage } from "next";
import { ReactNode } from "react";
import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";

import CornerGilding from "../Gilding/Corners";
import Nav from "../Nav";
import bgImage from "../../public/test-bg-small.jpg";
import styles from "./Layout.module.css";

interface Props {
  children: ReactNode;
  description: string;
}
const Layout: React.FC<Props> = ({ children, description }) => (
  <div
    className={styles.container}
    style={{ backgroundImage: `url(${bgImage.src})` }}
  >
    <Head>
      <title>Minting App</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <CornerGilding />
      {children}
      <Nav />
    </main>
  </div>
);

export default Layout;
