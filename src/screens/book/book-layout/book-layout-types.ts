export interface BookLayoutProperties {
	title: string
	hamburgerMenuElements: {
		title: string
		onPress: () => void
	}[]
	backgroundColor: string
	author: {
		name: string
		id: number
		navigate: (id: number) => void
	}
}
