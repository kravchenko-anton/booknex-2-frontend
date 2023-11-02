import {
	boldTextStyle,
	ImportantProperty
} from '@/redux/reading-settings/reading-settings-slice'
import { Color } from '@/utils/color'

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

export const themePack = [
	{
		title: 'Light',
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
		theme: themeTemplate({
			backgroundColor: '#202020',
			textColor: '#fff',
			primaryColor: '#bb77b0',
			secondaryColor: '#4e7855',
			highlight: {
				background: '#214283',
				color: Color.white
			}
		})
	},
	{
		title: 'Sepia',
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
		theme: themeTemplate({
			backgroundColor: '#1f1d2e',
			textColor: '#fff',
			primaryColor: '#5a189a',
			secondaryColor: '#31748f',
			highlight: {
				background: '#9f21e3',
				color: '#fff'
			}
		})
	}
]
