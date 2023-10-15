import BookCard from '@/components/book-card/book-card'
import RainbowBookCard from '@/components/book-card/rainbow-book-card/rainbow-book-card'
import HeaderScrollLayout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import FlatList from '@/components/ui/flatlist/flatlist'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { genreService } from '@/services/genre-service'
import { removeEmoji } from '@/utils/remove-emoji'
import { useQuery } from '@tanstack/react-query'

const Genre = () => {
	const { params } = useTypedRoute<'Genre'>()
	const { data: genre } = useQuery(['genres', params.id], () =>
		genreService.byId(+params.id)
	)
	const { navigate } = useTypedNavigation()
	if (!genre) return <BigLoader />
	return (
		<HeaderScrollLayout
			header={{
				rightIcon: (
					<Title size={24} weight={'bold'}>
						{genre.name}
					</Title>
				)
			}}
			animatedHeader={{
				title: removeEmoji(genre.name),
				transientValue: 50
			}}>
			<FlatList
				horizontal
				headerText={'Best Sellers'}
				data={genre.bestSellers}
				renderItem={({ item: book }) => (
					<BookCard
						title={book.title}
						image={{
							uri: book.picture,
							size: 'medium'
						}}
						onPress={() => {
							navigate('Book', { id: book.id })
						}}
					/>
				)}
			/>

			<FlatList
				horizontal
				headerText={'Newest Books'}
				data={genre.newestBooks}
				renderItem={({ item: book }) => (
					<RainbowBookCard
						title={book.title}
						image={{
							uri: book.picture
						}}
						description={book.description}
						onPress={() => {
							navigate('Book', { id: book.id })
						}}
						backgroundColor={book.color}
					/>
				)}
			/>

			{genre.bestSellersFromSimilar.map(simular => {
				return (
					<FlatList
						key={simular.name}
						headerText={removeEmoji(simular.name)}
						horizontal
						mt={30}
						data={simular.majorBooks}
						renderItem={({ item: book }) => (
							<BookCard
								onPress={() => {
									navigate('Book', { id: book.id })
								}}
								image={{
									uri: book.picture,
									size: 'medium'
								}}
							/>
						)}
					/>
				)
			})}
		</HeaderScrollLayout>
	)
}

export default Genre
