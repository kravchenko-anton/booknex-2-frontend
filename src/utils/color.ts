import { theme } from '../../tailwind.config'

export type colorsType = {
	gray: '#666666',
	primary: '#2B6B76',
	secondary: '#2F3742',
	accent: '#75471E',
	background: '#F9EFE8',
	black: '#000',
	white: '#fff',
	alert: '#DC3F41',
	highlight: '#FFBE0B',
	transparent: 'transparent'
}

export type lineColorType =
	| '#666666'
	| '#2B6B76'
	| '#2F3742'
	| '#75471E'
	| '#F9EFE8'
	| '#000'
	| '#fff'
	| '#DC3F41'
	| '#FFBE0B'
	| 'transparent'
export interface ColorProps {
	color?: lineColorType
}

export const Color = theme.colors as colorsType