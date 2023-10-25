import { useCallback } from 'react'
import template from '../template'
import type { EPubCfi, SourceType, Theme } from '../types'

export function useInjectWebVieWVariables() {
	const scrollFlow = {
		width: '100%',
		height: '100%',
		spread: 'none',
		manager: 'continuous',
		flow: 'scrolled'
	}

	const paginatedFlow = {
		width: '100%',
		height: '100%'
	}

	const injectWebVieWVariables = useCallback(
		({
			jszip,
			epubjs,
			type,
			book,
			theme,
			enableSelection,
			locations,
			flow = 'paginated'
		}: {
			jszip: string
			epubjs: string
			type: SourceType
			book: string
			theme: Theme
			flow: 'paginated' | 'scrolled'
			enableSelection: boolean
			locations?: EPubCfi[]
		}) =>
			template
				.replace(
					/<script id="jszip"><\/script>/,
					`<script src="${jszip}"></script>`
				)
				.replace(
					/<script id="epubjs"><\/script>/,
					`<script src="${epubjs}"></script>`
				)
				.replace(/const type = window.type;/, `const type = '${type}';`)
				.replace(/const file = window.book;/, `const file = '${book}';`)
				.replace(
					/const theme = window.theme;/,
					`const theme = ${JSON.stringify(theme)};`
				)
				.replace(
					/const initialLocations = window.locations;/,
					`const initialLocations = ${locations};`
				)
				.replace(
					/const enableSelection = window.enable_selection;/,
					`const enableSelection = ${enableSelection};`
				)
				.replace(
					/const flow = window.flow;/,
					`const flow = ${
						flow === 'paginated'
							? JSON.stringify(paginatedFlow)
							: JSON.stringify(scrollFlow)
					};`
				),
		[]
	)
	return { injectWebVieWVariables }
}
