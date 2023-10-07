import { useTypedRoute } from '@/hooks/useTypedRoute'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const Shelf = () => {
	const { params } = useTypedRoute<'Shelf'>()
	const { data: shelf } = useQuery(['shelf' + params.id], () =>
		userServices.getLibrary()
	)
	return <View></View>
}

export default Shelf
