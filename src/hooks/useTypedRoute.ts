import { TypeRootStackParameterList } from '@/navigation/navigation-types'
import { RouteProp, useRoute } from '@react-navigation/native'

export const useTypedRoute = <N extends keyof TypeRootStackParameterList>() =>
	useRoute<RouteProp<TypeRootStackParameterList, N>>()
