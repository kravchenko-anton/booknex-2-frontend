import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { FC, useEffect, useState } from 'react'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import BottomMenu from '../components/ui/bottom-menu/BottomMenu'
import { Color } from '../utils/color'

import PrivateNavigator from './PrivateNavigator'

const Navigation: FC = () => {
const { user } = {user : true}
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(
		undefined
	)

	const navRef = useNavigationContainerRef()

	useEffect(() => {
		setCurrentRoute(navRef.getCurrentRoute()?.name)

		const listener = navRef.addListener('state', () =>
			setCurrentRoute(navRef.getCurrentRoute()?.name)
		)

		return () => {
			navRef.removeListener('state', listener)
		}
	}, [])


	return (
		<SafeAreaProvider
			initialMetrics={initialWindowMetrics}
			style={{
				backgroundColor: Color.background
			}}>
			<NavigationContainer ref={navRef}>
				<PrivateNavigator />
			</NavigationContainer>
			{user && currentRoute && (
				<BottomMenu nav={navRef.navigate} currentRoute={currentRoute} />
			)}
			
			<StatusBar style={'dark'} />
		</SafeAreaProvider>
	)
}

export default Navigation
