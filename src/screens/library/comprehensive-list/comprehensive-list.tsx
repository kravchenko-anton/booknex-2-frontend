import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import FlatList from '@/components/ui/flatlist/flatlist'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { ShortBookType } from '@/services/types/book-service-types'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const ComprehensiveList = () => {
	const { params } = useTypedRoute<'ComprehensiveList'>()
	const { data: library } = useQuery(['user-library-more'], () =>
		userServices.getMore(params.type)
	)
	console.log(library)
	// TODO: сделать лист и пофиксить типы
	if (!library) return <BigLoader />
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
				data={library[params.type] as ShortBookType[]}
				renderItem={({ item }) => <View></View>}
			/>
		</Layout>
	)
}

export default ComprehensiveList
