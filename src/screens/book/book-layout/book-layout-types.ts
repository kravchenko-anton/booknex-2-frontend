export interface BookLayoutProperties {
	author: {
		id: number
		name: string
		navigate: (id: number) => void
	}
	backgroundColor: string
	hamburgerMenuElements: {
		onPress: () => void
		title: string
	}[]
	title: string
}
