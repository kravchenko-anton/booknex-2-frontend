import { theme } from '../../tailwind.config'

export interface ColorsType {
	gray: '#666666'
	primary: '#2B6B76'
	secondary: '#75471E'
	dust: '#F2E4DC'
	canvas: '#F9EFE8'
	black: '#000'
	pale: '#FDF7F4'
	white: '#fff'
	alert: '#DC3F41'
	highlight: '#FFBE0B'
	transparent: 'transparent'
}

export type LineColorType =
	| '#666666'
	| '#2B6B76'
	| '#75471E'
	| '#F2E4DC'
	| '#FDF7F4'
	| '#F9EFE8'
	| '#000'
	| '#fff'
	| '#DC3F41'
	| '#FFBE0B'
	| 'transparent'

export interface ColorProperties {
	color?: LineColorType
}

export const Color = theme.colors as ColorsType
