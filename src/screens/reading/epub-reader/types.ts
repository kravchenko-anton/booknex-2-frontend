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

export type LoadingFileProperties = {
	fileSize: number
	downloadProgress: number
	downloadSuccess: boolean
	downloadError: string | null
}

type FileSystem = {
	file: string | null
	progress: number
	downloading: boolean
	size: number
	error: string | null
	success: boolean
	downloadFile: (
		fromUrl: string,
		toFile: string
	) => Promise<{ uri: string | null; mimeType: string | null }>
	getFileInfo: (fileUri: string) => Promise<{
		uri: string
		exists: boolean
		isDirectory: boolean
		size: number | undefined
	}>
}

export interface ReaderProperties {
	src: string
	initialLocations?: EPubCfi[]
	onStarted?: () => void
	flow: 'paginated' | 'scrolled'
	onReady?: (
		totalLocations: number,
		currentLocation: Location,
		progress: number
	) => void
	onDisplayError?: (reason: string) => void
	onResized?: (layout: any) => void
	onLocationChange?: (
		totalLocations: number,
		currentLocation: Location,
		progress: number
	) => void
	onSearch?: (results: SearchResult[]) => void
	onLocationsReady?: (epubKey: string, locations: EPubCfi[]) => void
	onSelected?: (selectedText: string, cfiRange: EPubCfi) => void
	onMarkPressed?: (selectedText: string, cfiRange: EPubCfi) => void
	onOrientationChange?: (orientation: '-90' | '0' | '90') => void
	onBeginning?: () => void
	onFinish?: () => void
	onRendered?: (section: any, currentSection: any) => void
	onLayout?: (layout: any) => void
	onNavigationLoaded?: (toc: any) => void
	onPress?: () => void
	width: number
	height: number
	initialLocation?: string
	enableSwipe?: boolean
	onSwipeLeft?: () => void
	onSwipeRight?: () => void

	enableSelection?: boolean
	defaultTheme?: Theme
	fileSystem(): FileSystem
}
