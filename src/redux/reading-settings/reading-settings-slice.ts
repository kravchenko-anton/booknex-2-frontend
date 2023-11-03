import type { EPubCfi } from '@/screens/reading/epub-reader/types'
import type { ThemePackType } from '@/screens/reading/settings/sheet/reading/theme-pack'
import { defaultTheme } from '@/screens/reading/settings/sheet/reading/theme-pack'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export enum ReaderFontsEnum {
	CourierNew = 'Courier New, Courier, monospace',
	Arial = 'Arial, Helvetica, sans-serif',
	TimesNewRoman = 'Times New Roman, Times, serif'
}
export type LineReaderFontsType =
	(typeof ReaderFontsEnum)[keyof typeof ReaderFontsEnum]
export const ReaderFont = [
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

const initialState = {
	colorScheme: defaultTheme as ThemePackType,
	fontFamily: 'Arial, Helvetica, sans-serif' as LineReaderFontsType,
	fontSize: 14,
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
		changeTheme: (state, { payload }: PayloadAction<ThemePackType>) => {
			state.colorScheme = payload
			console.log('changeTheme', payload)
		},
		changeLineHeight: (state, { payload }: PayloadAction<number>) => {
			state.lineHeight = payload
		},
		changePadding: (state, { payload }: PayloadAction<number>) => {
			state.padding = payload
		},
		changeFontFamily: (
			state,
			{ payload }: PayloadAction<LineReaderFontsType>
		) => {
			state.fontFamily = payload
			console.log('changeFontFamily', payload)
		},

		changeFontSize: (state, { payload }: PayloadAction<number>) => {
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
