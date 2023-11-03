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
		color: ImportantProperty(primaryColor),
		'font-size': '36px !important'
	},
	h2: {
		'font-weight': boldTextStyle,
		color: ImportantProperty(primaryColor),
		'font-size': '32px !important'
	},
	h3: {
		'font-weight': boldTextStyle,
		color: ImportantProperty(primaryColor),
		'font-size': '28px !important'
	},
	h4: {
		color: ImportantProperty(primaryColor),
		'font-weight': boldTextStyle,
		'font-size': '24px !important'
	},
	h5: {
		color: ImportantProperty(primaryColor),
		'font-weight': boldTextStyle,
		'font-size': '20px !important'
	},
	h6: {
		color: ImportantProperty(primaryColor),
		'font-weight': boldTextStyle,
		'font-size': '18px !important'
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
	theme: Theme
}

export const defaultTheme = {
	title: 'Light',
	slug: 'light',
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
			color: Color.primary + ' !important',
			'font-size': '36px !important'
		},
		h2: {
			'font-weight': 'bold !important',
			color: Color.primary + ' !important',
			'font-size': '32px !important'
		},
		h3: {
			'font-weight': 'bold !important',
			color: Color.primary + ' !important',
			'font-size': '28px !important'
		},
		h4: {
			color: Color.primary + ' !important',
			'font-weight': 'bold !important',
			'font-size': '24px !important'
		},
		h5: {
			color: Color.primary + ' !important',
			'font-weight': 'bold !important',
			'font-size': '20px !important'
		},
		h6: {
			color: Color.primary + ' !important',
			'font-weight': 'bold !important',
			'font-size': '18px !important'
		},
		'::selection': {
			background: Color.dust,
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
		theme: themeTemplate({
			backgroundColor: Color.white,
			textColor: Color.black,
			primaryColor: Color.primary,
			secondaryColor: Color.secondary,
			highlight: {
				background: Color.dust,
				color: Color.white
			}
		})
	},
	{
		title: 'Dark',
		slug: 'dark',
		statusBar: 'light',
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
		theme: themeTemplate({
			backgroundColor: '#f4ecd8',
			textColor: '#2d2a32',
			primaryColor: '#f3c623',
			secondaryColor: '#710000',
			highlight: {
				background: '#007f5f',
				color: '#fff'
			}
		})
	},
	{
		title: 'Dark purple',
		slug: 'dark-purple',
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
