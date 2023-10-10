import { useAuth } from '@/hooks/useAuth'
import { UserLibraryFieldsType } from '@/services/types/user-services-types'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'

export const useFavoritesList = (type: keyof UserLibraryFieldsType) => {
	const { user } = useAuth()

	const { isLoading, data: favoriteList } = useQuery(
		[`Favorite list ${type}`],
		() => userServices.getMore(type),
		{
			enabled: !!user
		}
	)

	return {
		isLoading,
		favoriteList: favoriteList && favoriteList[type]
	}
}
