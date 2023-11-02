import type {
	EPubCfi,
	FontSize,
	Theme
} from '@/screens/reading/epub-reader/types'
import type { LineColorType } from '@/utils/color'
import { Color } from '@/utils/color'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export enum ReaderFontsEnum {
	CourierNew = 'Courier New, Courier, monospace',
	Arial = 'Arial, Helvetica, sans-serif',
	TimesNewRoman = 'Times New Roman, Times, serif',
	Impact = 'Impact, fantasy'
}
export type LineReaderFontsType =
	(typeof ReaderFontsEnum)[keyof typeof ReaderFontsEnum]
export const ReaderFontTitle = [
	{
		title: 'Courier New',
		fontFamily: ReaderFontsEnum.CourierNew
	},
	{
		title: 'Arial',
		fontFamily: ReaderFontsEnum.Arial
	},
	{
		title: 'Times New Roman',
		fontFamily: ReaderFontsEnum.TimesNewRoman
	}
]
export const ImportantProperty = (property: string | number) =>
	property + ' !important'
export const ThemeColor = (property: string | number): LineColorType =>
	property.toString().replace(' !important', '') as LineColorType
const color = ImportantProperty('#000000')
export const boldTextStyle = ImportantProperty('bold')
export const defaultTheme: Theme = {
	body: {
		background: '#ffffff',
		padding: ImportantProperty(`${14}px`),
		'line-height': ImportantProperty(1.3)
	},
	i: {
		color: ImportantProperty(Color.primary)
	},
	span: {
		color
	},
	p: {
		color
	},
	li: {
		color
	},
	a: {
		color: ImportantProperty(Color.secondary),
		'font-weight': boldTextStyle,
		textDecoration: ImportantProperty('none'),
		transition: 'color 0.3s',
		'font-style': ImportantProperty('italic')
	},
	h1: {
		'font-weight': boldTextStyle,
		color: ImportantProperty(Color.primary),
		'font-size': ImportantProperty('36px')
	},
	h2: {
		'font-weight': boldTextStyle,
		color: ImportantProperty(Color.primary),
		'font-size': ImportantProperty('32px')
	},
	h3: {
		'font-weight': boldTextStyle,
		color: ImportantProperty(Color.primary),
		'font-size': ImportantProperty('28px')
	},
	h4: {
		color: ImportantProperty(Color.primary),
		'font-weight': boldTextStyle,
		'font-size': ImportantProperty('24px')
	},
	h5: {
		color: ImportantProperty(Color.primary),
		'font-weight': boldTextStyle,
		'font-size': ImportantProperty('20px')
	},
	h6: {
		color: ImportantProperty(Color.primary),
		'font-weight': boldTextStyle,
		'font-size': ImportantProperty('18px')
	},
	'::selection': {
		background: Color.primary,
		color: '#fff'
	},
	ul: {
		color,
		'list-style-type': ImportantProperty('disc')
	},
	ol: {
		color,
		'list-style-type': ImportantProperty('decimal')
	},
	strong: {
		color,
		'font-weight': boldTextStyle
	},
	em: {
		color,
		fontStyle: 'italic'
	},
	b: {
		'font-weight': boldTextStyle,
		color: ImportantProperty(Color.primary)
	}
}
const initialState = {
	theme: defaultTheme,
	fontFamily: 'Arial, Helvetica, sans-serif' as LineReaderFontsType,
	fontSize: ImportantProperty('14px'),
	flow: 'scrolled' as 'paginated' | 'scrolled',
	lineHeight: 1.3 as number,
	padding: 14 as number,
	lastBookLocations: null as
		| null
		| {
				id: number
				progress: number
				location: EPubCfi
		  }[]
}

const ReadingSettingsSlice = createSlice({
	name: 'readingSettings',
	initialState,
	reducers: {
		changeTheme: (state, { payload }: PayloadAction<Theme>) => {
			state.theme = payload
			console.log('changeTheme', payload)
		},
		changeLineHeight: (state, { payload }: PayloadAction<number>) => {
			state.theme.body = {
				...state.theme.body,
				'line-height': ImportantProperty(payload)
			}
		},
		changePadding: (state, { payload }: PayloadAction<number>) => {
			state.theme.body = {
				...state.theme.body,
				padding: `${payload}px !important`
			}
		},
		changeFontFamily: (
			state,
			{ payload }: PayloadAction<LineReaderFontsType>
		) => {
			state.fontFamily = payload
			console.log('changeFontFamily', payload)
		},

		changeFontSize: (state, { payload }: PayloadAction<FontSize>) => {
			state.fontSize = payload
			console.log('changeFontSize', payload)
		},

		changeFlow: (
			state,
			{ payload }: PayloadAction<'paginated' | 'scrolled'>
		) => {
			state.flow = payload
			console.log('changeFlow', payload)
		},

		addLastBookLocations: (
			state,
			{
				payload
			}: PayloadAction<{ id: number; location: EPubCfi; progress: number }>
		) => {
			console.log('addLastBookLocations', payload)
			// write to state but if the id already exists, replace the location

			state.lastBookLocations = [
				...(state.lastBookLocations ?? []).filter(
					({ id }) => id !== payload.id
				),
				payload
			]
		}
	}
})
export const {
	reducer: ReadingSettingsReducer,
	actions: ReadingSettingsAction
} = ReadingSettingsSlice
