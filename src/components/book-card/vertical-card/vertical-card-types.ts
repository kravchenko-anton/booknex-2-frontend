import { PressableDefaultProperties } from '@/types/component-types'

export interface VerticalBookCardProperties extends PressableDefaultProperties {
	image: {
		uri: string
		size: 'small' | 'medium' | 'large' | 'cube'
	}

	title: string
	description?: string
	descriptionLines?: number
	buttons?: string[]
}
