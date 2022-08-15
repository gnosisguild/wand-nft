import Link from "next/link";
import { useRouter } from "next/router";
import ButtonBackground from "./ButtonBackground";
import ConnectButton from "../ConnectButton";
import MintButton from "../MintButton";
import styles from "./Nav.module.css";

const Nav: React.FC = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.aboutLink}>
          <Link href="/about">About</Link>
          <ButtonBackground className={styles.aboutBackground} />
        </li>
        <li className={styles.wandsLink}>
          <Link href="/wands">Wands</Link>
          <ButtonBackground className={styles.wandsBackground} />
        </li>
      </ul>
      <MintButton navMode={currentRoute !== "/"} />
      <div className={styles.AccountConnect}>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Nav;
