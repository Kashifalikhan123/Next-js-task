import styles from "./JoinAction.module.scss";
import HeadlineAndText from "../HeadlineAndText/HeadlineAndText";
import Images from "../Images/Images";

export interface JoinActionProps {
  title?: string;
  text?: string;
  img?: string;
  logo?: boolean;
  link?: string;
  url?: string;
  size?: string;
}

export default function JoinAction({
  title,
  text,
  img,
  logo = false,
  link,
  url,
  size = "large",
}: JoinActionProps) {
  return (
    <div
      className={`${styles.JoinAction} ${img ? styles.hasImg : ""}`}
      data-component="JoinAction"
    >
      {img ? (
        <Images
          src={`/images/${img}`}
          layout="fill"
          objectFit="cover"
          objectPosition="50% 30%"
          alt="blank"
        />
      ) : null}

      <HeadlineAndText
        align="center"
        weight="large"
        size={size}
        logo={logo}
        link={link}
        url={url}
      />
    </div>
  );
}
