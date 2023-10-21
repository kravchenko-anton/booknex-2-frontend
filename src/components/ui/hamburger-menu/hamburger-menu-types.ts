import type { ColorProperties } from '@/utils/color'

export interface HamburgerMenuProperties extends ColorProperties {
	elements: {
		onPress: () => void,
		title: string
	}[],
	position: 'left' | 'right'
}
