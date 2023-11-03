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

export type EPubCfi = string

export type Theme = {
	body: {
		background: string
	}
	i: {
		color: string
	}
	span: {
		color: string
	}
	p: {
		color: string
	}
	li: {
		color: string
	}
	a: {
		color: string
		'font-weight': string
		textDecoration: string
		transition: string
		'font-style': string
	}
	h1: {
		'font-weight': string
		color: string
		'font-size': string
	}
	h2: {
		'font-weight': string
		color: string
		'font-size': string
	}
	h3: {
		'font-weight': string
		color: string
		'font-size': string
	}
	h4: {
		color: string
		'font-weight': string
		'font-size': string
	}
	h5: {
		color: string
		'font-weight': string
		'font-size': string
	}
	h6: {
		color: string
		'font-weight': string
		'font-size': string
	}
	'::selection': {
		background: string
		color: string
	}
	ul: {
		color: string
		'list-style-type': string
	}
	ol: {
		color: string
		'list-style-type': string
	}
	strong: {
		color: string
		'font-weight': string
	}
	em: {
		color: string
		fontStyle: string
	}
	b: {
		'font-weight': string
		color: string
	}
}
export interface Toc {
	href: string
	label: string
}
export interface WebviewMessage {
	type: string
	htmlElement: string
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
}
