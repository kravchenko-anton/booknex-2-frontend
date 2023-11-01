import type {
	EPubCfi,
	FontSize,
	Theme
} from '@/screens/reading/epub-reader/types'
import { Color } from '@/utils/color'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type ReaderFonts =
	| 'Courier New, Courier, monospace'
	| 'Arial, Helvetica, sans-serif'
	| 'Times New Roman, Times, serif'
	| 'Impact, fantasy'

const lineHeight = 1.3 + ' !important'
const color = '#000' + ' !important'
export const defaultTheme: Theme = {
	body: {
		background: '#fff',
		padding: 14 + 'px !important',
		alignItems: 'center',
		justifyContent: 'center',
		'-webkit-user-select': 'text !important',
		'-webkit-touch-callout': 'none !important'
	},
	span: {
		color,
		'line-height': lineHeight
	},
	p: {
		color,
		'line-height': lineHeight
	},
	li: {
		color,
		'line-height': lineHeight
	},
	h1: {
		color,
		'font-weight': 'bold !important',
		'line-height': lineHeight
	},
	a: {
		color,
		'pointer-events': 'auto',
		cursor: 'pointer',
		'font-weight': 'bold !important',
		'line-height': lineHeight
	},
	'::selection': {
		background: Color.dust
	}
}
const initialState = {
	theme: defaultTheme,
	fontFamily: 'Arial, Helvetica, sans-serif' as ReaderFonts,
	fontSize: '14px !important' as FontSize,
	flow: 'scrolled' as 'paginated' | 'scrolled',
	lastBookLocations: null as
		| null
		| {
				id: number
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

		changeFontFamily: (state, { payload }: PayloadAction<ReaderFonts>) => {
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
			{ payload }: PayloadAction<{ id: number; location: EPubCfi }>
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
