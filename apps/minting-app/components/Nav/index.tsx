import Link from "next/link";
import ButtonBackground from "./ButtonBackground";
import ConnectButton from "../ConnectButton";
import MintButton from "../MintButton";
import styles from "./Nav.module.css";

const Nav: React.FC = () => (
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
    <MintButton />
    <div className={styles.AccountConnect}>
      <ConnectButton />
    </div>
  </nav>
);

export default Nav;
