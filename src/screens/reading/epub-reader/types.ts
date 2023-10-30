export type Location = {
	atStart?: boolean
	atEnd?: boolean
	end: {
		cfi: EPubCfi
		displayed: {
			page: number
			total: number
		}
		href: string
		index: number
		location: number
		percentage: number
	}
	start: {
		cfi: EPubCfi
		displayed: {
			page: number
			total: number
		}
		href: string
		index: number
		location: number
		percentage: number
	}
}

export type Mark = 'highlight' | 'underline'

export type FontSize = string

export type EPubCfi = string

export type Theme = Record<string, Record<string, string>>
export interface Toc {
	href: string
	label: string
}
export interface WebviewMessage {
	type: string
	totalLocations: number
	currentLocation: Location
	progress: number
	reason: string
	layout: string
	epubKey: string
	locations: EPubCfi[]
	results: SearchResult[]
	cfiRange: string
	text: string
	section: string
	currentSection: string
	toc: Toc[]
}
export type SearchResult = {
	cfi: EPubCfi
	excerpt: string
}

export enum SourceType {
	BASE64 = 'base64',
	EPUB = 'epub',
	OPF = 'opf',
	BINARY = 'binary'
}

export interface ReaderProperties {
	src: string
	id: number
	initialLocations?: EPubCfi[]
}
