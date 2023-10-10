import { useFavoritesList } from '@/hooks/useToggle/useFavoriteList'
import { UseToggleProperties } from '@/hooks/useToggle/useToggle-types'
import { userServices } from '@/services/user-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLayoutEffect, useState } from 'react'

export const useToggle = (data: UseToggleProperties, invalidate?: string[]) => {
	const QueryClient = useQueryClient()
	const [isSmashed, setIsSmashed] = useState(false)
	const { favoriteList } = useFavoritesList(data.type)
	useLayoutEffect(() => {
		if (!favoriteList) return

		const isSome = favoriteList.some(f => f.id === data.id)

		if (isSmashed !== isSome) setIsSmashed(isSome)
	}, [favoriteList, isSmashed, data.id, data.type])

	const { mutateAsync: toggle } = useMutation(
		['toggle' + data.type, data.id],
		(properties: UseToggleProperties) =>
			userServices.toggle(properties.type, properties.id),
		{
			onSuccess: async () => {
				await QueryClient.invalidateQueries([`Favorite list ${data.type}`])
				if (invalidate) {
					await QueryClient.invalidateQueries(invalidate)
				}
			}
		}
	)

	const handleToggle = async () => {
		await toggle(data)
	}

	return { isSmashed, handleToggle }
}
