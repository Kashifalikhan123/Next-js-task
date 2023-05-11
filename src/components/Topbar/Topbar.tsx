import Data from "constants/topbar";
import Link from "next/link";
import styles from "./Topbar.module.scss";
import Button from "components/Button";
import classNames from "classnames";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { getStyles, ThemeVariant } from "../../utils/ThemedComponent";
import PowerIconblack from "assets/logo/PowerIconblack.svg";
import Hamburger from "assets/hamburger.svg";

import CompanyName from "components/CompanyName";
import FaTimes from "fontawesome/faTimes.svg";

export interface TopbarProps {
  defaultTheme?: ThemeVariant;
}

export const Topbar = forwardRef(
  ({ defaultTheme = ThemeVariant.WHITE }: TopbarProps, ref) => {
    const [offset, setOffset] = useState(0);
    const [state, setState] = useState("down");
    const [menu, setMenu] = useState("closed");
    const [barTheme, setBarTheme] = useState(defaultTheme);


    useImperativeHandle(ref, () => ({
      changeTheme(theme: ThemeVariant) {
        if (theme) {
          setBarTheme(theme);
        }
      },
    }));

    const handleToggleMenu = (e) => {
      const element = document.querySelector(
        '[data-class="menu"]'
      ) as HTMLElement;
      if (element.classList.contains(styles.open)) {
        setMenu("closed");
      } else {
        setMenu("open");
      }
    };

    useEffect(() => {
      // mount
      var scroll = window.scrollY;
      var buffer = 100;
      const initialScroll = 38;

      const handleScroll = () => {
        var diff = Math.abs(scroll - window.scrollY);

        setPadding();

        if (diff < buffer) return;

        if (scroll < window.scrollY) {
          // scrolling up
          setState("up");
        } else {
          // scrolling down
          setState("down");
        }

        scroll = window.scrollY;
      };

      function setPadding() {
        if (window.innerWidth < 960) {
          return;
        }
        if (window.scrollY <= initialScroll) {
          setOffset(window.scrollY);
        } else {
          if (offset < initialScroll) {
            setOffset(initialScroll);
          }
        }
      }

      window.addEventListener("scroll", handleScroll);

      return function () {
        // unmount
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <nav
        className={classNames(
          styles.topbar,
          styles[state],
            getStyles("bg-dark", "border-semitransparent", "text-white")
        )}
      >
        <Link prefetch={false} href="#">
          <a
            aria-label="Home"
            className={classNames(
              styles.logo,
              barTheme === "dark"
                ? getStyles("border-semitransparent")
                : barTheme === "transparent"
                ? getStyles("border-semitransparent")
                : null
            )}
          >
  
          </a>
        </Link>
        <div className={styles.companyName}>
          <Link prefetch={false} href="#">
            <a aria-label="Home">
              <img src="/images/logo.png" alt="ll"/>
            </a>
          </Link>
        </div>
        <div
          data-class="menu"
          className={classNames(styles.menu, styles[menu])}
        >
          <div className={styles.close} onClick={handleToggleMenu}>
            <FaTimes />
          </div>

          

          <div className={styles.sidekick}>
            <div className={styles.sidekickImage}>
           
            </div>
            <div className={styles.sidekickBox}>
              <div className={styles.sidekickTitle}>VirtuPro sidekick app</div>
              <div className={styles.sidekickText}>
                Available for iPhone and Android
              </div>
            </div>
          </div>
        </div>
        <div className={styles.hamburger} onClick={handleToggleMenu}>
   }
        </div>

     
      </nav>
    );
  }
);

export default Topbar;
