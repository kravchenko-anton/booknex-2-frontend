import type {
	EPubCfi,
	FontSize,
	Location,
	SearchResult,
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
		padding: '14px !important',
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
	atStart: false as boolean,
	atEnd: false as boolean,
	key: '' as string,
	totalLocations: 0 as number,
	currentLocation: null as Location | null,
	progress: 0 as number,
	locations: [] as EPubCfi[],
	isLoading: true as boolean,
	isRendering: true as boolean,
	searchResults: [] as SearchResult[]
}

const EpubReaderSlice = createSlice({
	name: 'epub-reader',
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

		setAtStart: (state, { payload }: PayloadAction<boolean>) => {
			console.log('setAtStart', payload)
			state.atStart = payload
		},

		setAtEnd: (state, { payload }: PayloadAction<boolean>) => {
			console.log('setAtEnd', payload)
			state.atEnd = payload
		},

		setTotalLocations: (state, { payload }: PayloadAction<number>) => {
			console.log('setTotalLocations', payload)
			state.totalLocations = payload
		},

		setCurrentLocation: (state, { payload }: PayloadAction<Location>) => {
			console.log('setCurrentLocation', payload)
			state.currentLocation = payload
		},

		setProgress: (state, { payload }: PayloadAction<number>) => {
			console.log('setProgress', payload)
			state.progress = payload
		},

		setLocations: (state, { payload }: PayloadAction<EPubCfi[]>) => {
			// console.log('setLocations', payload)
			state.locations = payload
		},

		setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
			console.log('setIsLoading', payload)
			state.isLoading = payload
		},

		setIsRendering: (state, { payload }: PayloadAction<boolean>) => {
			console.log('setIsRendering', payload)
			state.isRendering = payload
		},

		// goToLocation: (state, { payload }: PayloadAction<EPubCfi>) => {
		// 	console.log('goToLocation', payload)

		// },
		// search: (state, { payload }: PayloadAction<string>) => {
		// 	console.log('search', payload)
		// 	state.bookRef?.current.injectJavaScript(`
		//   Promise.all(
		//     book.spine.spineItems.map((item) => {
		//       return item.load(book.load.bind(book)).then(() => {
		//         let results = item.find('${payload}'.trim());
		//         item.unload();
		//         return Promise.resolve(results);
		//       });
		//     })
		//   ).then((results) =>
		//     window.ReactNativeWebView.postMessage(
		//       JSON.stringify({ type: 'onSearch', results: [].concat.apply([], results) })
		//     )
		//   ); true
		// `)
		// },

		setSearchResults: (state, { payload }: PayloadAction<SearchResult[]>) => {
			console.log('setSearchResults', payload)
			state.searchResults = payload
		},

		setKey: (state, { payload }: PayloadAction<string>) => {
			console.log('setKey', payload)
			state.key = payload
		}
	}
})
export const { reducer: EpubReaderReducer, actions: EpubReaderAction } =
	EpubReaderSlice

// TODO: сделать higlight
//	// addMark: (
// 		// 	state,
// 		// 	{
// 		// 		payload: { type, cfiRange, data, callback, className, styles }
// 		// 	}: PayloadAction<{
// 		// 		type: Mark
// 		// 		cfiRange: EPubCfi
// 		// 		data?: any
// 		// 		callback?: () => void
// 		// 		className?: string
// 		// 		styles?: any
// 		// 	}>
// 		// ) => {
// 		// 	const defaultStyles = { fill: Color.primary }
// 		//
// 		// 	book.injectJavaScript(`
//     //   rendition.annotations.add('${type}', '${cfiRange}', ${JSON.stringify(
// 		// 		data ?? {}
// 		// 	)}, ${JSON.stringify(
// 		// 		callback ? callback() : () => {}
// 		// 	)}, '${className}', ${JSON.stringify(styles ?? defaultStyles)}); true
//     // `)
// 		// },
// 		//
// 		// removeMark: (
// 		// 	state,
// 		// 	{
// 		// 		payload: { cfiRange, type }
// 		// 	}: PayloadAction<{ cfiRange: EPubCfi; type: Mark }>
// 		// ) => {
// 		// 	state.book?.injectJavaScript(`
// 		// 	rendition.annotations.remove('${cfiRange}', '${type}'); true
// 		// `)
// 		// },
