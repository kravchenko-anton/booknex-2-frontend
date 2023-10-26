import { Color } from '@/utils/color'
import React, {
	createContext,
	useCallback,
	useMemo,
	useReducer,
	useRef
} from 'react'
import type WebView from 'react-native-webview'
import type {
	EPubCfi,
	FontSize,
	Location,
	Mark,
	SearchResult,
	Theme
} from './types'

type ActionMap<M extends Record<string, any>> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key
		  }
		: {
				type: Key
				payload: M[Key]
		  }
}

enum Types {
	CHANGE_THEME = 'CHANGE_THEME',
	CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE',
	CHANGE_FONT_FAMILY = 'CHANGE_FONT_FAMILY',
	SET_AT_START = 'SET_AT_START',
	SET_AT_END = 'SET_AT_END',
	SET_KEY = 'SET_KEY',
	SET_TOTAL_LOCATIONS = 'SET_TOTAL_LOCATIONS',
	SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION',
	SET_PROGRESS = 'SET_PROGRESS',
	SET_LOCATIONS = 'SET_LOCATIONS',
	SET_IS_LOADING = 'SET_IS_LOADING',
	SET_IS_RENDERING = 'SET_IS_RENDERING',
	SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
}

type BookPayload = {
	[Types.CHANGE_THEME]: Theme
	[Types.CHANGE_FONT_SIZE]: FontSize
	[Types.CHANGE_FONT_FAMILY]: string
	[Types.SET_AT_START]: boolean
	[Types.SET_AT_END]: boolean
	[Types.SET_KEY]: string
	[Types.SET_TOTAL_LOCATIONS]: number
	[Types.SET_CURRENT_LOCATION]: Location
	[Types.SET_PROGRESS]: number
	[Types.SET_LOCATIONS]: EPubCfi[]
	[Types.SET_IS_LOADING]: boolean
	[Types.SET_IS_RENDERING]: boolean
	[Types.SET_SEARCH_RESULTS]: SearchResult[]
}

type BookActions = ActionMap<BookPayload>[keyof ActionMap<BookPayload>]

type InitialState = {
	theme: Theme
	fontFamily: string
	fontSize: FontSize
	atStart: boolean
	atEnd: boolean
	key: string
	totalLocations: number
	currentLocation: Location | null
	progress: number
	locations: EPubCfi[]
	isLoading: boolean
	isRendering: boolean
	searchResults: SearchResult[]
}
const defaultFont = 'Impact, fantasy'
const lineHeight = 1.5
// Comic Sans MS, cursive -
// Courier New, Courier, monospace -
// Arial, Helvetica, sans-serif -
// Times New Roman, Times, serif -
// Impact, fantasy
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
		color: '#000 !important',
		'font-family': defaultFont,
		'line-height': `${lineHeight} !important`
	},
	p: {
		color: '#000 !important',
		'font-family': defaultFont,
		'line-height': `${lineHeight} !important`
	},
	li: {
		color: '#000 !important',
		'font-family': defaultFont,
		'line-height': `${lineHeight} !important`
	},
	h1: {
		color: '#000 !important',
		'font-family': defaultFont,
		'font-weight': 'bold !important',
		'line-height': `${lineHeight} !important`
	},
	a: {
		color: '#000 !important',
		'pointer-events': 'auto',
		cursor: 'pointer',
		'font-family': defaultFont,
		'font-weight': 'bold !important',
		'line-height': `${lineHeight} !important`
	},
	'::selection': {
		background: Color.dust
	}
}

const initialState: InitialState = {
	theme: defaultTheme,
	fontFamily: 'Arial',
	fontSize: '14px !important',
	atStart: false,
	atEnd: false,
	key: '',
	totalLocations: 0,
	currentLocation: null,
	progress: 0,
	locations: [],
	isLoading: true,
	isRendering: true,
	searchResults: []
}

function bookReducer(state: InitialState, action: BookActions): InitialState {
	switch (action.type) {
		case Types.CHANGE_THEME: {
			return {
				...state,
				theme: action.payload
			}
		}
		case Types.CHANGE_FONT_SIZE: {
			return {
				...state,
				fontSize: action.payload
			}
		}
		case Types.CHANGE_FONT_FAMILY: {
			return {
				...state,
				fontFamily: action.payload
			}
		}
		case Types.SET_AT_START: {
			return {
				...state,
				atStart: action.payload
			}
		}
		case Types.SET_AT_END: {
			return {
				...state,
				atEnd: action.payload
			}
		}
		case Types.SET_KEY: {
			return {
				...state,
				key: action.payload
			}
		}
		case Types.SET_TOTAL_LOCATIONS: {
			return {
				...state,
				totalLocations: action.payload
			}
		}
		case Types.SET_CURRENT_LOCATION: {
			return {
				...state,
				currentLocation: action.payload
			}
		}
		case Types.SET_PROGRESS: {
			return {
				...state,
				progress: action.payload
			}
		}
		case Types.SET_LOCATIONS: {
			return {
				...state,
				locations: action.payload
			}
		}
		case Types.SET_IS_LOADING: {
			return {
				...state,
				isLoading: action.payload
			}
		}
		case Types.SET_IS_RENDERING: {
			return {
				...state,
				isRendering: action.payload
			}
		}
		case Types.SET_SEARCH_RESULTS: {
			return {
				...state,
				searchResults: action.payload
			}
		}
		default: {
			return state
		}
	}
}

export interface ReaderContextProperties {
	registerBook: (bookReference: WebView) => void
	setAtStart: (atStart: boolean) => void
	setAtEnd: (atEnd: boolean) => void
	setTotalLocations: (totalLocations: number) => void
	setCurrentLocation: (location: Location) => void
	setProgress: (progress: number) => void
	setLocations: (locations: EPubCfi[]) => void
	setIsLoading: (isLoading: boolean) => void
	setIsRendering: (isRendering: boolean) => void
	goToLocation: (cfi: EPubCfi) => void
	goPrevious: () => void
	goNext: () => void
	getLocations: () => EPubCfi[]
	getCurrentLocation: () => Location | null
	search: (query: string) => void
	changeTheme: (theme: Theme) => void
	changeFontFamily: (fontFamily: string) => void
	changeFontSize: (size: FontSize) => void
	addMark: (
		type: Mark,
		cfiRange: EPubCfi,
		data?: any,
		callback?: () => void,
		className?: string,
		styles?: any
	) => void
	removeMark: (cfiRange: EPubCfi, type: Mark) => void
	setKey: (key: string) => void
	key: string
	theme: Theme
	atStart: boolean
	atEnd: boolean
	totalLocations: number
	currentLocation: Location | null
	progress: number
	locations: EPubCfi[]
	isLoading: boolean
	isRendering: boolean
	searchResults: SearchResult[]
	setSearchResults: (results: SearchResult[]) => void
}

const ReaderContext = createContext<ReaderContextProperties>({
	registerBook: () => {},
	setAtStart: () => {},
	setAtEnd: () => {},
	setTotalLocations: () => {},
	setCurrentLocation: () => {},
	setProgress: () => {},
	setLocations: () => {},
	setIsLoading: () => {},
	setIsRendering: () => {},
	goToLocation: () => {},
	goPrevious: () => {},
	goNext: () => {},
	getLocations: () => [],
	getCurrentLocation: () => null,
	search: () => {},
	changeTheme: () => {},
	changeFontFamily: () => {},
	changeFontSize: () => {},
	addMark: () => {},
	removeMark: () => {},
	setKey: () => {},
	key: '',
	theme: defaultTheme,
	atStart: false,
	atEnd: false,
	totalLocations: 0,
	currentLocation: null,
	progress: 0,
	locations: [],
	isLoading: true,
	isRendering: true,
	searchResults: [],
	setSearchResults: () => {}
})

function ReaderProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(bookReducer, initialState)
	const book = useRef<WebView | null>(null)

	const registerBook = useCallback((bookReference: WebView) => {
		book.current = bookReference
	}, [])

	const changeTheme = useCallback((theme: Theme) => {
		book.current?.injectJavaScript(`
      rendition.themes.register({ theme: ${JSON.stringify(theme)} });
      rendition.themes.select('theme');
      rendition.views().forEach(view => view.pane ? view.pane.render() : null); true;
    `)
		dispatch({ type: Types.CHANGE_THEME, payload: theme })
	}, [])

	const changeFontFamily = useCallback((fontFamily: string) => {
		book.current?.injectJavaScript(`
      rendition.themes.font('${fontFamily}');
    `)
		dispatch({ type: Types.CHANGE_FONT_FAMILY, payload: fontFamily })
	}, [])

	const changeFontSize = useCallback((size: FontSize) => {
		book.current?.injectJavaScript(`
      rendition.themes.fontSize('${size}'); true
    `)
		dispatch({ type: Types.CHANGE_FONT_SIZE, payload: size })
	}, [])

	const setAtStart = useCallback((atStart: boolean) => {
		dispatch({ type: Types.SET_AT_START, payload: atStart })
	}, [])

	const setAtEnd = useCallback((atEnd: boolean) => {
		dispatch({ type: Types.SET_AT_END, payload: atEnd })
	}, [])

	const setTotalLocations = useCallback((totalLocations: number) => {
		dispatch({ type: Types.SET_TOTAL_LOCATIONS, payload: totalLocations })
	}, [])

	const setCurrentLocation = useCallback((location: Location) => {
		dispatch({ type: Types.SET_CURRENT_LOCATION, payload: location })
	}, [])

	const setProgress = useCallback((progress: number) => {
		dispatch({ type: Types.SET_PROGRESS, payload: progress })
	}, [])

	const setLocations = useCallback((locations: EPubCfi[]) => {
		dispatch({ type: Types.SET_LOCATIONS, payload: locations })
	}, [])

	const setIsLoading = useCallback((isLoading: boolean) => {
		dispatch({ type: Types.SET_IS_LOADING, payload: isLoading })
	}, [])

	const setIsRendering = useCallback((isRendering: boolean) => {
		dispatch({ type: Types.SET_IS_RENDERING, payload: isRendering })
	}, [])

	const goToLocation = useCallback((targetCfi: EPubCfi) => {
		book.current?.injectJavaScript(`rendition.display('${targetCfi}'); true`)
	}, [])

	const goPrevious = useCallback(() => {
		book.current?.injectJavaScript('rendition.prev(); true')
	}, [])

	const goNext = useCallback(() => {
		book.current?.injectJavaScript('rendition.next(); true')
	}, [])

	const getLocations = useCallback(() => state.locations, [state.locations])

	const getCurrentLocation = useCallback(
		() => state.currentLocation,
		[state.currentLocation]
	)

	const search = useCallback((query: string) => {
		book.current?.injectJavaScript(`
      Promise.all(
        book.spine.spineItems.map((item) => {
          return item.load(book.load.bind(book)).then(() => {
            let results = item.find('${query}'.trim());
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
	}, [])

	const setSearchResults = useCallback((results: SearchResult[]) => {
		dispatch({ type: Types.SET_SEARCH_RESULTS, payload: results })
	}, [])

	const addMark = useCallback(
		(
			type: Mark,
			cfiRange: string,
			data?: any,
			callback?: () => void,
			className?: string,
			styles?: any
		) => {
			const defaultStyles = { fill: Color.primary }

			book.current?.injectJavaScript(`
      rendition.annotations.add('${type}', '${cfiRange}', ${JSON.stringify(
				data ?? {}
			)}, ${JSON.stringify(
				callback ? callback() : () => {}
			)}, '${className}', ${JSON.stringify(styles ?? defaultStyles)}); true
    `)
		},
		[]
	)

	const removeMark = useCallback((cfiRange: string, type: Mark) => {
		book.current?.injectJavaScript(`
      rendition.annotations.remove('${cfiRange}', '${type}'); true
    `)
	}, [])

	const setKey = useCallback((key: string) => {
		dispatch({ type: Types.SET_KEY, payload: key })
	}, [])

	const contextValue = useMemo(
		() => ({
			registerBook,
			setAtStart,
			setAtEnd,
			setTotalLocations,
			setCurrentLocation,
			setProgress,
			setLocations,
			setIsLoading,
			setIsRendering,
			goToLocation,
			goPrevious,
			goNext,
			getLocations,
			getCurrentLocation,
			search,
			addMark,
			removeMark,
			setKey,
			key: state.key,
			changeTheme,
			changeFontFamily,
			changeFontSize,
			theme: state.theme,
			atStart: state.atStart,
			atEnd: state.atEnd,
			totalLocations: state.totalLocations,
			currentLocation: state.currentLocation,
			progress: state.progress,
			locations: state.locations,
			isLoading: state.isLoading,
			isRendering: state.isRendering,
			searchResults: state.searchResults,
			setSearchResults
		}),
		[
			addMark,
			changeFontFamily,
			changeFontSize,
			changeTheme,
			getCurrentLocation,
			getLocations,
			goNext,
			goPrevious,
			goToLocation,
			registerBook,
			removeMark,
			search,
			setAtEnd,
			setAtStart,
			setCurrentLocation,
			setIsLoading,
			setIsRendering,
			setKey,
			setLocations,
			setProgress,
			setSearchResults,
			setTotalLocations,
			state.atEnd,
			state.atStart,
			state.currentLocation,
			state.isLoading,
			state.isRendering,
			state.key,
			state.locations,
			state.progress,
			state.searchResults,
			state.theme,
			state.totalLocations
		]
	)
	return (
		<ReaderContext.Provider value={contextValue}>
			{children}
		</ReaderContext.Provider>
	)
}

export { ReaderContext, ReaderProvider }
