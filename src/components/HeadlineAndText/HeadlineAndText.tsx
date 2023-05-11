import styles from "./HeadlineAndText.module.scss";
import LightningLogo from "assets/logo/PowerIconblack.svg";
import Button from "components/Button";
import {
  HeadlineAlign,
  HeadlineSizes,
  HeadlineWeights,
} from "../Headline/Headline";
import {
  getStyles,
  ThemeComponent,
  ThemeVariant,
} from "../../utils/ThemedComponent";
import classNames from "classnames";
// import commons from "constants/common_routes";

export interface HeadlineAndTextProps {
  align?: HeadlineAlign;
  size?: any;
  weight?: HeadlineWeights;
  title?: string;
  text?: string;
  logo?: boolean;
  button?: boolean;
  variant?: ThemeVariant;
  className?: string;
  link?: string;
  url?: string;
}

export default function HeadlineAndText({
  align,
  size,
  weight,
  title,
  text,
  logo,
  button,
  className = "",
  variant,
  link = "Join VirtuPro",
  // url = commons.signup,
}: HeadlineAndTextProps) {
  let darkText =
    variant === ThemeVariant.DARK ? getStyles(ThemeComponent.TEXT_WHITE) : null;
  return (
    <div
      className={classNames(
        styles.HeadlineAndText,
        styles[align],
        className,
        darkText
      )}
      data-component="HeadlineAndText"
    >
      {/* {logo ? <LightningLogo /> : <></>} */}
      {/* {title ? (
        <Headline size={size} align={align} weight={weight}>
          {title}
        </Headline>
      ) : null} */}
      {/* {text ? (
        <span className={classNames(styles.text, darkText)}>{text}</span>
      ) : (
        <></>
      )} */}
      {/* {button ? <Button label={link} appearance="primary" href={url} /> : <></>} */}
    </div>
  );
}
