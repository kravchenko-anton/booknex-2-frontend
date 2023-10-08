import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import FlatList from '@/components/ui/flatlist/flatlist'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const ComprehensiveList = () => {
	const { params } = useTypedRoute<'ComprehensiveList'>()
	const { data: library } = useQuery(['user-library-more'], () =>
		userServices.getMore(params.type)
	)
	console.log(library)
	if (!library) return <BigLoader />
	// TODO: после создания списка shelf на главной и тогла, доделать эту тему
	return (
		<Layout>
			<Header
				rightIcon={
					<Title size={24} weight={'medium'}>
						{library.title}
					</Title>
				}
			/>
			<FlatList
				mt={25}
				scrollEnabled={false}
				data={library[params.type]}
				renderItem={({ item }) => <View></View>}
			/>
		</Layout>
	)
}

export default ComprehensiveList
