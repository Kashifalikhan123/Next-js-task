import styles from './Headline.module.scss';
import classNames from 'classnames';

export const HeadlineWeights = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
} as const;

export type HeadlineWeights = typeof HeadlineWeights[keyof typeof HeadlineWeights];

export const HeadlineSizes = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
} as const;

export type HeadlineSizes = typeof HeadlineSizes[keyof typeof HeadlineSizes];

export const HeadlineAlign = {
	LEFT: 'left',
	CENTER: 'center',
} as const;

export type HeadlineAlign = typeof HeadlineAlign[keyof typeof HeadlineAlign];

export const HeadlineTag = {
	DIV: 'div',
	H1: 'h1',
	H2: 'h2',
	H3: 'h3',
	H4: 'h4',
	H5: 'h5',
	H6: 'h6',
} as const;

export type HeadlineTag = typeof HeadlineTag[keyof typeof HeadlineTag];

export interface HeadlineProps {
	as?: HeadlineTag;
	children: React.ReactNode;
	size?: HeadlineSizes;
	weight?: HeadlineWeights;
	align?: HeadlineAlign;
	actions?: React.ReactNode;
	reference?: string;
}

export default function Headline({
	as = 'h1',
	children,
	align = HeadlineAlign.LEFT,
	size = HeadlineSizes.LARGE,
	weight = HeadlineWeights.LARGE,
	actions,
	reference,
}: HeadlineProps) {
	const Tag = as;
	return (
		<Tag
			data-component="Headline"
			id={reference}
			className={classNames(
				styles.headline,
				styles[`${weight}Weight`],
				styles[`${size}Size`],
				styles[`${align}Align`]
			)}
		>
			{children}
		</Tag>
	);
}
