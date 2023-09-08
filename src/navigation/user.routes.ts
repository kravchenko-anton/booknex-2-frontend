import Auth from '../screens/auth/auth'
import Book from '../screens/book/book'
import Catalog from '../screens/catalog/catalog'
import Home from '../screens/home/home'
import Profile from '../screens/profile/profile'
import Reading from '../screens/reading/reading'
import Search from '../screens/search/search'
import Settings from '../screens/settings/settings'
import { adminRoutes } from './admin.routes'
import { IRoute } from './navigation.types'

export const userRoutes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Settings',
		component: Settings
	},
	{
		name: 'Auth',
		component: Auth
	},
	{
name: 'Profile',
component: Profile
	},
	{
		name: 'Reading',
		component: Reading
	},
	{
		name: 'Book',
		component: Book
	},
	{
		name: 'Catalog',
		component: Catalog
	},
	{
		name: 'Search',
		component: Search
	}
]

export const routes = [...userRoutes, ...adminRoutes]
