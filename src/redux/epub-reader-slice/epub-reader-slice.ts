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
import type WebView from 'react-native-webview'

type ReaderFonts =
	| 'Courier New, Courier, monospace'
	| 'Arial, Helvetica, sans-serif'
	| 'Times New Roman, Times, serif'
	| 'Impact, fantasy'
const defaultFont = 'Courier New, Courier, monospace' as ReaderFonts
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
		'font-family': defaultFont,
		'line-height': lineHeight
	},
	p: {
		color,
		'font-family': defaultFont,
		'line-height': lineHeight
	},
	li: {
		color,
		'font-family': defaultFont,
		'line-height': lineHeight
	},
	h1: {
		color,
		'font-family': defaultFont,
		'font-weight': 'bold !important',
		'line-height': lineHeight
	},
	a: {
		color,
		'pointer-events': 'auto',
		cursor: 'pointer',
		'font-family': defaultFont,
		'font-weight': 'bold !important',
		'line-height': lineHeight
	},
	'::selection': {
		background: Color.dust
	}
}
const initialState = {
	book: null as WebView | null,
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
		registerBook: (state, action: PayloadAction<WebView>) => {
			;(state.book as WebView) = action.payload
		},

		changeTheme: (state, { payload }: PayloadAction<Theme>) => {
			console.log('changeTheme', payload)
			state.book?.injectJavaScript(`
       rendition.themes.register({ theme: ${JSON.stringify(payload)} });
       rendition.themes.select('theme');
       rendition.views().forEach(view => view.pane ? view.pane.render() : null); true;
     `)
			state.theme = payload
		},

		changeFontFamily: (state, { payload }: PayloadAction<ReaderFonts>) => {
			console.log('changeFontFamily', payload)
			state.book?.injectJavaScript(`
			 rendition.themes.font('${payload}');
		 `)
			state.fontFamily = payload
		},

		changeFontSize: (state, { payload }: PayloadAction<FontSize>) => {
			console.log('changeFontSize', payload)
			state.book?.injectJavaScript(`
			 rendition.themes.fontSize('${payload}'); true
		 `)
			state.fontSize = payload
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

		goToLocation: (state, { payload }: PayloadAction<EPubCfi>) => {
			console.log('goToLocation', payload)
			state.book?.injectJavaScript(`rendition.display('${payload}'); true`)
		},

		goPrevious: state => {
			console.log('goPrevious')
			state.book?.injectJavaScript('rendition.prev(); true')
		},

		goNext: state => {
			console.log('goNext')
			state.book?.injectJavaScript('rendition.next(); true')
		},
		search: (state, { payload }: PayloadAction<string>) => {
			console.log('search', payload)
			state.book?.injectJavaScript(`
      Promise.all(
        book.spine.spineItems.map((item) => {
          return item.load(book.load.bind(book)).then(() => {
            let results = item.find('${payload}'.trim());
            item.unload();
            return Promise.resolve(results);
          });
        })
      ).then((results) =>
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'onSearch', results: [].concat.apply([], results) })
        )
      ); true
    `)
		},

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
