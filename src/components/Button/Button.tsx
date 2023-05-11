import FaSpinner from 'fontawesome/faSpinner.svg';
import classNames from 'classnames';
import { forwardRef } from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';
import { getStyles, ThemeComponent, ThemeVariant } from '../../utils/ThemedComponent';

export const ButtonAppearance = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
	TERTIARY: 'tertiary',
	SMALL: 'small',
	NEUTRAL: 'neutral',
} as const;
export type ButtonAppearance = typeof ButtonAppearance[keyof typeof ButtonAppearance];

export interface ButtonProps {
	appearance?: ButtonAppearance;
	disabled?: boolean;
	href?: string;
	label: string;
	loading?: boolean;
	size?: string;
	style?: any;
	type?: 'button' | 'submit';
	onClick?: () => void;
	variant?: ThemeVariant;
	icon?: any;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	(
		{
			appearance = 'primary',
			href,
			label,
			disabled = false,
			onClick,
			loading,
			style = {},
			type = 'button',
			size = '',
			variant,
			icon,
			...props
		}: ButtonProps,
		ref
	) => {
		const Tag = href ? 'a' : ('button' as any);
		const stylize =
			appearance === ButtonAppearance.TERTIARY &&
			(variant === ThemeVariant.DARK || variant === ThemeVariant.TRANSPARENT)
				? true
				: null;
		const border = stylize
			? getStyles(ThemeComponent.BG_BLACK, ThemeComponent.BORDER_WHITE)
			: null;
		const text = stylize ? getStyles(ThemeComponent.TEXT_WHITE) : null;
		const background =
			stylize && variant === ThemeVariant.TRANSPARENT
				? getStyles(ThemeComponent.BG_TRANSPARENT)
				: null;
		// const getTheme = variant ? ''
		const getTag = () => (
			<Tag
				data-component="Button"
				className={classNames(
					styles.button,
					styles[appearance],
					styles[size],
					border,
					background,
					styles[`theme__${variant}`]
				)}
				disabled={disabled}
				href={href}
				type={!href ? type : null}
				onClick={onClick}
				ref={ref}
				style={style}
				{...props}
			>
				{icon ? icon : <></>}
				<div className={classNames(loading && styles.isHidden, text)}>{label}</div>
				{loading && <FaSpinner />}
			</Tag>
		);

		return href ? (
			<Link prefetch={false} href={href}>
				{getTag()}
			</Link>
		) : (
			getTag()
		);
	}
);

export default Button;
