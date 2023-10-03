import { PressableDefaultProperties } from '@/types/component-types'

export interface RainbowBookCardProperties extends PressableDefaultProperties {
	title: string
	image: {
		uri: string
	}
	description: string
	backgroundColor: string
}
