import type {
	EPubCfi,
	Location,
	SearchResult,
	Toc
} from '@/screens/reading/epub-reader/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	toc: [] as Toc[],
	totalLocations: 0 as number,
	currentLocation: null as Location | null,
	progress: 0 as number,
	locations: [] as EPubCfi[],
	isLoading: true as boolean,
	isRendering: true as boolean,

	searchTerm: null as string | null,
	searchResults: [] as SearchResult[],

	goLocation: null as EPubCfi | null,

	goToProgress: null as number | null
}

const EpubReaderSlice = createSlice({
	name: 'epub-reader',
	initialState,
	reducers: {
		setToc: (state, { payload }: PayloadAction<Toc[]>) => {
			state.toc = payload
		},
		setTotalLocations: (state, { payload }: PayloadAction<number>) => {
			console.log('setTotalLocations', payload)
			state.totalLocations = payload
		},

		setCurrentLocation: (state, { payload }: PayloadAction<Location>) => {
			state.currentLocation = payload
		},

		goToProgress: (state, { payload }: PayloadAction<number>) => {
			state.goToProgress = payload
		},
		clearGoToProgress: state => {
			state.goToProgress = null
		},
		setProgress: (state, { payload }: PayloadAction<number>) => {
			console.log('setProgress', payload)
			state.progress = payload
		},

		setLocations: (state, { payload }: PayloadAction<EPubCfi[]>) => {
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

		goToLocation: (state, action: PayloadAction<EPubCfi>) => {
			console.log('goToLocation', action.payload)
			state.goLocation = action.payload
		},
		clearGoToLocation: state => {
			state.goLocation = null
		},
		search: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload
		},
		clearSearch: state => {
			state.searchTerm = null
		},
		setSearchResults: (state, { payload }: PayloadAction<SearchResult[]>) => {
			console.log('setSearchResults', payload)
			state.searchResults = payload
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
