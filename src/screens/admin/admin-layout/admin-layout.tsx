import HeaderScrollLayout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import type { AdminLayoutProperties } from '@/screens/admin/admin-layout/admin-layout-types'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'

const AdminLayout: FC<PropsWithChildren<AdminLayoutProperties>> = ({
	children,
	...properties
}) => {
	const hamburgerMenuElements = [
		{
			title: 'Books',
			onPress: () => {
				console.log('Books')
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
				console.log('Statistic')
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
		<HeaderScrollLayout
			animatedHeader={{
				title: properties.title,
				transientValue: 85,
				right: {
					hamburger: {
						elements: hamburgerMenuElements
					}
				}
			}}
			header={{
				right: {
					hamburger: {
						elements: hamburgerMenuElements
					}
				},
				left: {
					title: properties.title
				}
			}}>
			<View {...properties}>{children}</View>
		</HeaderScrollLayout>
	)
}

export default AdminLayout
