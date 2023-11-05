import type { Theme } from '@/screens/reading/epub-reader/types'
import type { LineColorType } from '@/utils/color'
import { Color } from '@/utils/color'

export const ImportantProperty = (property: string | number) =>
	property + ' !important'
export const ThemeColor = (property: string | number): LineColorType =>
	property.toString().replace(' !important', '') as LineColorType
export const boldTextStyle = ImportantProperty('bold')
export interface ThemeTemplateProperties {
	backgroundColor: string
	textColor: string
	highlight: {
		background: string
		color: string
	}
	primaryColor: string
	secondaryColor: string
}

export const themeTemplate = ({
	backgroundColor,
	textColor,
	primaryColor,
	secondaryColor,
	highlight
}: ThemeTemplateProperties) => ({
	body: {
		background: backgroundColor
	},
	i: {
		color: ImportantProperty(primaryColor)
	},
	span: {
		color: textColor
	},
	p: {
		color: textColor
	},
	li: {
		color: textColor
	},
	a: {
		color: ImportantProperty(secondaryColor),
		'font-weight': boldTextStyle,
		textDecoration: 'none !important',
		transition: 'color 0.3s',
		'font-style': 'italic !important'
	},
	h1: {
		'font-weight': boldTextStyle,
		color: ImportantProperty(primaryColor)
	},
	h2: {
		'font-weight': boldTextStyle,
		color: ImportantProperty(primaryColor)
	},
	h3: {
		'font-weight': boldTextStyle,
		color: ImportantProperty(primaryColor)
	},
	h4: {
		color: ImportantProperty(primaryColor),
		'font-weight': boldTextStyle
	},
	h5: {
		color: ImportantProperty(primaryColor),
		'font-weight': boldTextStyle
	},
	h6: {
		color: ImportantProperty(primaryColor),
		'font-weight': boldTextStyle
	},
	'::selection': {
		background: highlight.background,
		color: highlight.color
	},
	ul: {
		color: textColor,
		'list-style-type': 'disc !important'
	},
	ol: {
		color: textColor,
		'list-style-type': 'decimal !important'
	},
	strong: {
		color: textColor,
		'font-weight': boldTextStyle
	},
	em: {
		color: textColor,
		fontStyle: 'italic'
	},
	b: {
		'font-weight': boldTextStyle,
		color: ImportantProperty(primaryColor)
	}
})

export interface ThemePackType {
	title:
		| 'Light'
		| 'Dark'
		| 'Sepia'
		| 'Dark purple'
		| 'Dark green'
		| 'Tokyo night'
		| 'Solarized'
		| 'Blue night'
		| 'Kanagawa'
		| 'Pink owl'
	slug:
		| 'light'
		| 'dark'
		| 'sepia'
		| 'dark-purple'
		| 'dark-green'
		| 'tokyo-night'
		| 'solarized'
		| 'blue-night'
		| 'kanagawa'
		| 'pink-owl'
	statusBar: 'dark' | 'light'
	colorPalette: string[]
	theme: Theme
}

export const defaultTheme = {
	title: 'Light',
	slug: 'light',
	colorPalette: [Color.white, Color.black, Color.primary, Color.secondary],
	statusBar: 'dark',
	theme: {
		body: {
			background: Color.white
		},
		i: {
			color: Color.primary + ' !important'
		},
		span: {
			color: Color.black
		},
		p: {
			color: Color.black
		},
		li: {
			color: Color.black
		},
		a: {
			color: Color.secondary + ' !important',
			'font-weight': 'bold !important',
			textDecoration: 'none !important',
			transition: 'color 0.3s',
			'font-style': 'italic !important'
		},
		h1: {
			'font-weight': 'bold !important',
			color: Color.primary + ' !important'
		},
		h2: {
			'font-weight': 'bold !important',
			color: Color.primary + ' !important'
		},
		h3: {
			'font-weight': 'bold !important',
			color: Color.primary + ' !important'
		},
		h4: {
			color: Color.primary + ' !important',
			'font-weight': 'bold !important'
		},
		h5: {
			color: Color.primary + ' !important',
			'font-weight': 'bold !important'
		},
		h6: {
			color: Color.primary + ' !important',
			'font-weight': 'bold !important'
		},
		'::selection': {
			background: '#214283',
			color: Color.white
		},
		ul: {
			color: Color.black,
			'list-style-type': 'disc !important'
		},
		ol: {
			color: Color.black,
			'list-style-type': 'decimal !important'
		},
		strong: {
			color: Color.black,
			'font-weight': 'bold !important'
		},
		em: {
			color: Color.black,
			fontStyle: 'italic'
		},
		b: {
			'font-weight': 'bold !important',
			color: Color.primary + ' !important'
		}
	}
}

export const themePack: ThemePackType[] = [
	{
		title: 'Light',
		slug: 'light',
		statusBar: 'dark',
		colorPalette: [Color.white, Color.black, Color.primary, Color.secondary],
		theme: themeTemplate({
			backgroundColor: Color.white,
			textColor: Color.black,
			primaryColor: Color.primary,
			secondaryColor: Color.secondary,
			highlight: {
				background: '#214283',
				color: Color.white
			}
		})
	},
	{
		title: 'Dark',
		slug: 'dark',
		statusBar: 'light',
		colorPalette: ['#202020', '#fff', '#4d92d3', '#cf8e6d'],
		theme: themeTemplate({
			backgroundColor: '#202020',
			textColor: '#fff',
			primaryColor: '#4d92d3',
			secondaryColor: '#cf8e6d',
			highlight: {
				background: '#214283',
				color: Color.white
			}
		})
	},
	{
		title: 'Sepia',
		slug: 'sepia',
		statusBar: 'dark',
		colorPalette: ['#f4ecd8', '#2d2a32', '#606c38', '#684E32'],
		theme: themeTemplate({
			backgroundColor: '#f4ecd8',
			textColor: '#2d2a32',
			primaryColor: '#606c38',
			secondaryColor: '#684E32',
			highlight: {
				background: '#007f5f',
				color: '#fff'
			}
		})
	},
	{
		title: 'Dark purple',
		slug: 'dark-purple',
		colorPalette: ['#1f1d2e', '#d3cedc', '#bb77b0', '#ebbcba'],
		statusBar: 'light',
		theme: themeTemplate({
			backgroundColor: '#1f1d2e',
			textColor: '#d3cedc',
			primaryColor: '#bb77b0',
			secondaryColor: '#ebbcba',
			highlight: {
				background: '#214283',
				color: '#fff'
			}
		})
	},
	{
		title: 'Dark green',
		slug: 'dark-green',
		colorPalette: ['#1d2021', '#c2ccd7', '#fb4934', '#ffc66d'],
		statusBar: 'light',
		theme: themeTemplate({
			backgroundColor: '#1d2021' as string,
			textColor: '#c2ccd7',
			primaryColor: '#fb4934',
			secondaryColor: '#ffc66d',
			highlight: {
				background: '#82a497',
				color: '#fff'
			}
		})
	},
	{
		title: 'Tokyo night',
		slug: 'tokyo-night',
		colorPalette: ['#1a1b26', '#b7bcd9', '#72d7c8', '#ffc66d'],
		statusBar: 'light',
		theme: themeTemplate({
			backgroundColor: '#1a1b26',
			textColor: '#b7bcd9',
			primaryColor: '#72d7c8',
			secondaryColor: '#ffc66d',
			highlight: {
				background: '#414868',
				color: '#fff'
			}
		})
	},
	{
		title: 'Solarized',
		slug: 'solarized',
		colorPalette: ['#002b36', '#a8b4b5', '#b58900', '#cb4b16'],
		statusBar: 'light',
		theme: themeTemplate({
			backgroundColor: '#002b36',
			textColor: '#a8b4b5',
			primaryColor: '#b58900',
			secondaryColor: '#cb4b16',
			highlight: {
				background: '#073642',
				color: '#fff'
			}
		})
	},
	{
		title: 'Blue night',
		slug: 'blue-night',
		statusBar: 'light',
		colorPalette: ['#121726', '#c2c8db', '#24b5a8', '#3398d3'],
		theme: themeTemplate({
			backgroundColor: '#121726',
			textColor: '#c2c8db',
			primaryColor: '#24b5a8',
			secondaryColor: '#3398d3',
			highlight: {
				background: '#2b3d65',
				color: '#fff'
			}
		})
	},
	{
		title: 'Kanagawa',
		slug: 'kanagawa',
		statusBar: 'light',
		colorPalette: ['#1f1f28', '#dcd7ba', '#957fb8', '#ff4848'],
		theme: themeTemplate({
			backgroundColor: '#1f1f28',
			textColor: '#dcd7ba',
			primaryColor: '#957fb8',
			secondaryColor: '#ff4848',
			highlight: {
				background: '#202839',
				color: '#fff'
			}
		})
	},
	{
		title: 'Pink owl',
		slug: 'pink-owl',
		colorPalette: ['#13111b', '#dcd7ba', '#ff699a', '#e7de79'],
		statusBar: 'light',
		theme: themeTemplate({
			backgroundColor: '#13111b',
			textColor: '#dcd7ba',
			primaryColor: '#ff699a',
			secondaryColor: '#e7de79',
			highlight: {
				background: '#2a2934',
				color: '#fff'
			}
		})
	}
]
