import type { PressableDefaultProperties } from '@/types/component-types'

export interface VerticalBookCardProperties extends PressableDefaultProperties {
	buttons?: string[],

	description?: string,
	descriptionLines?: number,
	image: {
		size: 'small' | 'medium' | 'large' | 'cube',
		uri: string
	},
	title: string
}
