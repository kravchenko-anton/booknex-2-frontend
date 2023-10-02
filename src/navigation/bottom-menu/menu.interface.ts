import { TypeRootStackParameterList } from '@/navigation/navigation-types'
import type { IconType } from '@/types/global'

export interface IMenuItem {
	iconName: IconType
	path: keyof TypeRootStackParameterList
}

export type TypeNavigate = (
	screenName: keyof TypeRootStackParameterList
) => void
