import { PressableDefaultProperties } from '@/types/component-types'
import { IconProperties } from '@/types/global'

export interface LibraryListElementType
	extends IconProperties,
		PressableDefaultProperties {
	name: string
	count: number
}
