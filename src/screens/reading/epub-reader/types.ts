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

export type Themes = Record<string, Theme>

export type Theme = Record<string, Record<string, string>>

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
	initialLocations?: EPubCfi[]
	onStarted?: () => void
	flow: 'paginated' | 'scrolled'
	width: number
	height: number
	enableSelection?: boolean
	defaultTheme?: Theme
}
