import Statistic from '@/screens/admin/statistic/statistic'
import type { IRoute } from './navigation-types'

export const adminRoutes: IRoute[] = [
	{
		name: 'Statistic',
		component: Statistic,
		isAdmin: true
	}
]
