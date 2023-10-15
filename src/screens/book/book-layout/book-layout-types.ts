export interface BookLayoutProperties {
	title: string
	shareFunction: () => void
	hamburgerMenuElements: {
		title: string
		onPress: () => void
	}[]
	backgroundColor: string
	author: {
		name: string
		id: number
	}
}

export interface BookLayoutSettingsProperties {
	id: number
	title: string
	pages: number
	likedPercentage: number
}
