// import ImageTrace from "next-image-trace-loader"
import styles from "./Images.module.scss";
import Image from "next/image";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { GetStaticProps } from "next";

export interface VPIProps {
  src: any;
  layout?: any;
  objectFit?: any;
  objectPosition?: any;
  className?: string;
  process?: string;
  quality?: number;
  unoptimized?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  alt?: string;
}

export default function Images({
  src,
  layout,
  objectFit,
  objectPosition,
  className,
  process,
  quality,
  width,
  height,
  unoptimized,
  priority,
  alt,
}: VPIProps) {
  const [imageReady, setImageReady] = useState(false);
  const handleLoad = (e) => {
    if (e.target.srcset) setImageReady(true);
  };

  const transitionClasses = {
    enter: styles[`fade_enter`],
    exit: styles[`fade_exit`],
    enterActive: styles[`fade_enter_active`],
    exitActive: styles[`fade_exit_active`],
  };
  const myLoader = ({ src }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <Image
        loader={myLoader}
        src={src}
        layout={layout}
        objectFit={objectFit ? objectFit : null}
        objectPosition={objectPosition ? objectPosition : null}
        className={classNames(
          styles.VirtuProImageEl,
          className,
          styles[process]
        )}
        onLoad={handleLoad}
        quality={quality}
        unoptimized={unoptimized}
        width={width}
        height={height}
        priority={true}
        alt={alt}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("test");
  return {
    props: {},
  };
};
