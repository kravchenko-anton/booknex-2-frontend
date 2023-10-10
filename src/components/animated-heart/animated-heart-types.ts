import { UserLibraryFieldsType } from '@/services/types/user-services-types'
import { PressableDefaultProperties } from '@/types/component-types'
import { ColorProperties } from '@/utils/color'

export interface AnimatedHeartProperties
	extends PressableDefaultProperties,
		ColorProperties {
	id: number
	size?: number
	type: keyof UserLibraryFieldsType
}
