import type { TypeRootStackParameterList } from '@/navigation/navigation-types'
import type { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

export const useTypedNavigation = () =>
	useNavigation<NavigationProp<TypeRootStackParameterList>>()
