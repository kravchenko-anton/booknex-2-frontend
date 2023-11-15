import type { EPubCfi } from '@/screens/reading/epub-reader/types'
import type { ThemePackType } from '@/screens/reading/settings/sheet/reading/theme-pack'
import {
	defaultTheme,
	themePack
} from '@/screens/reading/settings/sheet/reading/theme-pack'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export enum ReaderFontsEnum {
	Courier = 'Courier New, Courier, monospace',
	Arial = 'Arial, Helvetica, sans-serif',
	TimesRoman = 'Times New Roman, Times, serif'
}

export const fontSizeSettings = {
	min: 24,
	max: 38
}
export const ReaderFont = [
	{
		title: 'Courier',
		fontFamily: ReaderFontsEnum.Courier
	},
	{
		title: 'Arial',
		fontFamily: ReaderFontsEnum.Arial
	},
	{
		title: 'Time Roman',
		fontFamily: ReaderFontsEnum.TimesRoman
	}
]

const initialState = {
	colorScheme: defaultTheme as ThemePackType,
	font: {
		title: 'Courier New',
		fontFamily: ReaderFontsEnum.Courier
	} as (typeof ReaderFont)[0],
	fontSize: fontSizeSettings.min,
	flow: 'paginated' as 'paginated' | 'scrolled',
	lineHeight: 1.3 as 1.3 | 1.5 | 1.8,
	padding: 14 as 14 | 8 | 20,
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
		changeTheme: (state, { payload }: PayloadAction<ThemePackType['slug']>) => {
			const theme = themePack.find(value => value.slug === payload)
			if (payload === state.colorScheme.slug || !theme) return
			state.colorScheme = theme
			console.log('changeTheme', payload)
		},
		changeLineHeight: (state, { payload }: PayloadAction<1.3 | 1.5 | 1.8>) => {
			state.lineHeight = payload
		},
		changePadding: (state, { payload }: PayloadAction<14 | 8 | 20>) => {
			state.padding = payload
		},
		changeFontFamily: (
			state,
			{ payload }: PayloadAction<(typeof ReaderFont)[number]>
		) => {
			state.font = payload
			console.log('changeFontFamily', payload)
		},

		changeFontSize: (state, { payload }: PayloadAction<number>) => {
			console.log(payload)
			if (payload < fontSizeSettings.min || payload > fontSizeSettings.max)
				return
			state.fontSize = payload
			console.log('changeFontSize', payload)
		},

		changeFlow: (
			state,
			{ payload }: PayloadAction<'paginated' | 'scrolled'>
		) => {
			state.flow = payload
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
