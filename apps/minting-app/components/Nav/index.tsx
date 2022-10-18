import classNames from "classnames";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ButtonBackground from "./ButtonBackground";
import ConnectButton from "../ConnectButton";
import MintButton from "../MintButton";
import styles from "./Nav.module.css";

interface Props {
  className?: string;
  sizeRef: React.RefObject<SVGSVGElement>;
}

interface Position {
  top: number;
  left: number;
  width: number;
  height: number;
}

const Nav: React.FC<Props> = ({ className, sizeRef }) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [gildPosition, setGildPosition] = useState<DOMRect>();

  const getNavPosition = (
    refRect: DOMRect,
    firstChild: boolean = true
  ): Position => {
    const cornerGildWidth = refRect.width || 0;
    const cornerGildHeight = refRect.height || 0;
    const offsetTop = refRect.y || 0;
    const offsetLeft = refRect.x || 0;

    const left =
      (firstChild ? cornerGildWidth * 0.304 : cornerGildWidth * 0.584) +
      offsetLeft;
    return {
      width: cornerGildWidth * 0.23,
      height: cornerGildHeight * 0.1,
      top: cornerGildHeight * 0.141 + offsetTop,
      left,
    };
  };

  useEffect(() => {
    setGildPosition(sizeRef.current?.getBoundingClientRect());

    const handleResize = () => {
      setGildPosition(sizeRef.current?.getBoundingClientRect());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={classNames(styles.nav, className)}>
      <ul>
        <li
          className={classNames(styles.createLink, {
            [styles.active]: currentRoute === "/",
          })}
          style={
            gildPosition && {
              ...getNavPosition(gildPosition),
            }
          }
        >
          <Link href="/">Create</Link>
          <ButtonBackground className={styles.aboutBackground} />
        </li>
        <li
          className={classNames(styles.wandsLink, {
            [styles.active]: currentRoute === "/wands",
          })}
          style={
            gildPosition && {
              ...getNavPosition(gildPosition, false),
            }
          }
        >
          <Link href="/wands">Wands</Link>
          <ButtonBackground className={styles.wandsBackground} />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
