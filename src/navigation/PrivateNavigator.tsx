import Welcome from '@/screens/welcome/welcome'
import { Color } from '@/utils/color'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'
import Auth from '../screens/auth/auth'


import { TypeRootStackParamList } from './navigation-types'
import { routes, userRoutes } from './user-routes'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigator: FC = () => {
	const { user } = {user : false as unknown as {isAdmin : boolean}}

	return (
		<Stack.Navigator
			initialRouteName={user ? 'Home' : 'Welcome'}
			
			screenOptions={{
				animation: 'fade',
				headerShown: false,
				contentStyle: {
					backgroundColor: Color.canvas
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
				<>
					<Stack.Screen name='Welcome' component={Welcome} />
					<Stack.Screen name='Auth' component={Auth} />
				</>
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator
