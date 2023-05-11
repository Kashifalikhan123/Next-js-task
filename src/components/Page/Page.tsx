import classNames from "classnames";
import styles from "./Page.module.scss";
import Topbar from "components/Topbar/Topbar";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { ThemeVariant } from "../../utils/ThemedComponent";
import Head from "next/head";
export interface PageProps {
  children: React.ReactNode;
  pageTitle: string;
  themeVariant?: ThemeVariant;
}

export const Page = forwardRef(
  ({ children, pageTitle, themeVariant }: PageProps, ref) => {
    const bar = useRef();

    useImperativeHandle(ref, () => ({
      changeBarTheme(theme: ThemeVariant) {
        if (bar && theme) {
          // @ts-ignore
          bar.current.changeTheme(theme);
        }
      },
    }));

    useEffect(() => {
      // mount

      const handleKeyDown = (e: KeyboardEvent) => {
        // if (e.key === 'g') document.body.classList.toggle('grid');
      };

      window.addEventListener("keydown", handleKeyDown);

      return function () {
        // animateOut();
        // unmount
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
    return (
      <>
        <Head>
          <title> {pageTitle}</title>
        </Head>
        <Topbar defaultTheme={themeVariant ? themeVariant : null} ref={bar} />
        <main
          className={classNames(
            styles.page,
            styles[pageTitle.replace(" ", "")]
          )}
        >
          {children}
        </main>
      </>
    );
  }
);

export default Page;
