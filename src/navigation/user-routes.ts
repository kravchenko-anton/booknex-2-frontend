import Featured from '@/screens/featured/featured'
import Genre from '@/screens/genre/genre'
import Library from '@/screens/user-library/library'
import Book from '../screens/book/book'
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
		name: 'Genre',
		component: Genre
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
		name: 'Search',
		component: Search
	}
]

export const routes = [...userRoutes, ...adminRoutes]
