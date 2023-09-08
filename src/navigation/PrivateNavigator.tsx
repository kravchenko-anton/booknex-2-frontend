import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'
import Auth from '../screens/auth/auth'
import { Color } from '../utils/color'


import { TypeRootStackParamList } from './navigation.types'
import { routes, userRoutes } from './user.routes'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigator: FC = () => {
	const { user } = {user :{
		isAdmin: false
		}}

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: Color.background
				}
			}}
		>
			{user ? (
				user.isAdmin ? (
					routes.map(route => <Stack.Screen key={route.name} {...route} />)
				) : (
					userRoutes.map(route => <Stack.Screen key={route.name} {...route} />)
				)
			) : (
				<Stack.Screen name='Auth' component={Auth} />
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator