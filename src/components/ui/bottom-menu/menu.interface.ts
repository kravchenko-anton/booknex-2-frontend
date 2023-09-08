import { TypeRootStackParamList } from '../../../navigation/navigation.types'
import { IconType } from '../../../types/global'

export interface IMenuItem {
	iconName: IconType
	path: keyof TypeRootStackParamList
}

export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void
