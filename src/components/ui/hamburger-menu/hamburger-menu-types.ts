import { ColorProperties } from '@/utils/color'

export interface HamburgerMenuProperties extends ColorProperties {
	position: 'left' | 'right'
	elements: {
		title: string
		onPress: () => void
	}[]
}
