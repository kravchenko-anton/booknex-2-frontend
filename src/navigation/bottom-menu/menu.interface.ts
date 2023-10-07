import { TypeRootStackParameterList } from '@/navigation/navigation-types'
import { IconProperties } from '@/types/global'

export interface IMenuItem extends IconProperties {
	path: keyof TypeRootStackParameterList
}

export type TypeNavigate = (
	screenName: keyof TypeRootStackParameterList
) => void
