import { useContext } from 'react'
import type { ReaderContextProperties } from '../context'
import { ReaderContext } from '../context'

export function useReader() {
	const {
		changeFontSize,
		changeFontFamily,
		changeTheme,
		goToLocation,
		goPrevious,
		goNext,
		getLocations,
		getCurrentLocation,
		getMeta,
		search,
		addMark,
		removeMark,
		theme,
		atStart,
		atEnd,
		totalLocations,
		currentLocation,
		progress,
		locations,
		isLoading,
		key,
		searchResults
	} = useContext(ReaderContext)

	return {
		changeFontSize,
		changeFontFamily,
		changeTheme,
		goToLocation,
		goPrevious,
		goNext,
		getLocations,
		getCurrentLocation,
		getMeta,
		search,
		addMark,
		removeMark,
		theme,
		atStart,
		atEnd,
		totalLocations,
		currentLocation,
		progress,
		locations,
		isLoading,
		key,
		searchResults
	} as Pick<
		ReaderContextProperties,
		| 'changeFontSize'
		| 'changeFontFamily'
		| 'changeTheme'
		| 'goToLocation'
		| 'goPrevious'
		| 'goNext'
		| 'getLocations'
		| 'getCurrentLocation'
		| 'getMeta'
		| 'search'
		| 'addMark'
		| 'removeMark'
		| 'theme'
		| 'atStart'
		| 'atEnd'
		| 'totalLocations'
		| 'currentLocation'
		| 'progress'
		| 'locations'
		| 'isLoading'
		| 'key'
		| 'searchResults'
	>
}
