import style from './ThemedComponent.module.scss';

export const ThemeComponent = {
	DEFAULT: 'default',
	BG_BLACK: 'bg-black',
	BG_DARK: 'bg-dark',
	BG_PRIMARY: 'bg-primary',
	BG_PRIMARY_DARK: 'bg-primary-dark',
	BG_SECONDARY_BLUE: 'bg-secondary-blue',
	BG_SECONDARY_PINK: 'bg-secondary-pink',
	BG_SECONDARY_RED: 'bg-secondary-red',
	BG_SECONDARY_YELLOW: 'bg-secondary-yellow',
	BG_WHITE: 'bg-white',
	BG_SEMITRANSPARENT: 'bg-semitransparent',
	BG_TRANSPARENT: 'bg-transparent',
	BORDER_BLACK: 'border-black',
	BORDER_TRANSPARENT: 'border-transparent',
	BORDER_SEMITRANSPARENT: 'border-semitransparent',
	BORDER_PRIMARY: 'border-primary',
	BORDER_WHITE: 'border-white',
	BORDER_YELLOW: 'border-yellow',
	TEXT_BLACK: 'text-black',
	TEXT_WHITE: 'text-white',
} as const;

export const ThemeVariant = {
	DARK: 'dark',
	WHITE: 'white',
	TRANSPARENT: 'transparent',
} as const;

export type ThemeVariant = typeof ThemeVariant[keyof typeof ThemeVariant];

export type ThemeComponent = typeof ThemeComponent[keyof typeof ThemeComponent];

export function getStyles(...items: ThemeComponent[]): string[] {
	let styles = [];
	items.map((item) => styles.push(style[item]));
	return styles;
}
