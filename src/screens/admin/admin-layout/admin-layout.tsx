import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import type { AdminLayoutProperties } from '@/screens/admin/admin-layout/admin-layout-types'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'

const AdminLayout: FC<PropsWithChildren<AdminLayoutProperties>> = ({
	children,
	...properties
}) => {
	const { navigate } = useTypedNavigation()
	const hamburgerMenuElements = [
		{
			title: 'Books',
			onPress: () => {
				navigate('BookList')
			}
		},
		{
			title: 'Users',
			onPress: () => {
				console.log('Users')
			}
		},
		{
			title: 'Statistic',
			onPress: () => {
				navigate('Statistic')
			}
		},
		{
			title: 'Shelves',
			onPress: () => {
				console.log('Sheleves')
			}
		},
		{
			title: 'Authors',
			onPress: () => {
				console.log('Authors')
			}
		}
	]

	return (
		<Layout>
			<Header
				right={{
					hamburger: { elements: hamburgerMenuElements }
				}}
				left={{
					title: properties.title
				}}
			/>
			<View {...properties}>{children}</View>
		</Layout>
	)
}

export default AdminLayout
