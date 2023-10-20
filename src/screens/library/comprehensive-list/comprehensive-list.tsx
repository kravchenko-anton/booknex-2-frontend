import VerticalCard from '@/components/book-card/vertical-card/vertical-card'
import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import FlatList from '@/components/ui/flatlist/flatlist'
import BigLoader from '@/components/ui/loader/big-loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { ShortBookType } from '@/services/types/book-service-types'
import { ShortShelfType } from '@/services/types/shelf-service-types'
import { DesignationType } from '@/services/types/user-services-types'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'

const ComprehensiveList = () => {
	const { params } = useTypedRoute<'ComprehensiveList'>()
	const { data: library } = useQuery(
		['library', 'user-library' + params.type],
		() => userServices.getMore(params.type)
	)
	const { navigate } = useTypedNavigation()
	if (!library) return <BigLoader />

	return (
		<Layout>
			<Header
				right={{
					title: library.title
				}}
			/>
			{
				// TODO: сделать тут лист намного красивее
			}
			{DesignationType[params.type] === 'book' ? (
				<FlatList
					mt={0}
					scrollEnabled={false}
					data={library[params.type] as ShortBookType[]}
					renderItem={({ item: book }) => (
						<VerticalCard
							image={{
								uri: book.picture,
								size: 'medium'
							}}
							title={book.title}
							description={book.author.name}
							buttons={[`👍 ${book.likedPercentage}% liked`]}
							onPress={() => {
								navigate('Book', { id: book.id })
							}}
						/>
					)}
				/>
			) : (
				<FlatList
					mt={0}
					scrollEnabled={false}
					data={library[params.type] as ShortShelfType[]}
					renderItem={({ item: shelf }) => (
						<VerticalCard
							title={shelf.title}
							image={{
								size: 'cube',
								uri: shelf.picture
							}}
							descriptionLines={2}
							description={`${shelf.description}`}
							onPress={() => {
								navigate('Shelf', { id: shelf.id })
							}}
						/>
					)}
				/>
			)}
		</Layout>
	)
}

export default ComprehensiveList
