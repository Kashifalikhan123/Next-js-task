import Data from "constants/footer";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Button from "components/Button";

export default function Footer({ hasImage = true, spacer = hasImage }) {
  return (
    <>
      {spacer ? <div className={styles.spacer}></div> : <></>}
      <footer className={`${hasImage ? styles.hasImage : ""} ${styles.Footer}`}>
        <div className={styles.footWrap}>
          <div className={styles.top}>   
          </div>


        </div>
      </footer>
    </>
  );
}
