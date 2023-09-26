import GenreCatalog from '@/screens/catalog/genre-catalog/genre-catalog'
import Featured from '@/screens/featured/Featured'
import Library from '@/screens/user-library/user-library'
import Book from '../screens/book/book'
import Catalog from '../screens/catalog/catalog'
import Profile from '../screens/profile/profile'
import Reading from '../screens/reading/reading'
import Search from '../screens/search/search'
import Settings from '../screens/settings/settings'
import { adminRoutes } from './admin-routes'
import { IRoute } from './navigation-types'

export const userRoutes: IRoute[] = [
	{
		name: 'Featured',
		component: Featured
	},
	{
		name: 'Library',
		component: Library
	},
	{
		name: 'GenreCatalog',
		component: GenreCatalog
	},
	{
		name: 'Settings',
		component: Settings
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
