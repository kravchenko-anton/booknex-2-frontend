import BookCard from '@/components/book-card/book-card'
import Button from '@/components/ui/button/button'
import Description from '@/components/ui/description/description'
import FlatList from '@/components/ui/flatlist/flatlist'
import Icon from '@/components/ui/icon/icon'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import { useToggle } from '@/hooks/useToggle/useToggle'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import BookLayout from '@/screens/book/book-layout/book-layout'
import StatisticCard from '@/screens/book/statistic-card/statistic-card'
import { bookService } from '@/services/book-service'
import { Color } from '@/utils/color'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const Book = () => {
	const { navigate } = useTypedNavigation()
	const { params } = useTypedRoute<'Book'>()
	const { data: book } = useQuery(['book ', params.id], () =>
		bookService.byId(+params.id)
	)
	const { handleToggle: toggleReadingBooks, isSmashed: isSmashedReadingBooks } =
		useToggle(
			{
				type: 'readingBooks',
				id: params.id
			},
			['library']
		)
	if (!book) return <BigLoader />
	return (
		<BookLayout
			title={book.title}
			backgroundColor={book.color}
			hamburgerMenuElements={[
				{
					title: isSmashedReadingBooks
						? 'Remove from reading list'
						: 'Add to reading list',
					onPress: () => toggleReadingBooks()
				}
			]}
			author={book.author}>
			<View className='flex-row justify-between px-4'>
				<View className='flex-1 justify-between'>
					<StatisticCard
						description={'Duration'}
						icon={'clock'}
						count={`${Math.round(book.pages / 1.5 / 60)}h ${Math.round(
							(book.pages / 1.5) % 60
						)} min`}
					/>
					<StatisticCard
						description={'Pages'}
						icon={'book'}
						count={book.pages}
					/>
					<StatisticCard
						description={'Liked'}
						icon={'thumbsup'}
						count={`${book.likedPercentage}%`}
					/>
				</View>
				<Image
					url={book.picture}
					className='z-0 mt-[-50px]'
					height={260}
					width={170}
				/>
			</View>
			<View className='flex-row justify-between gap-2 px-4 pt-6'>
				<Button
					onPress={() => {
						navigate('Reading')
					}}
					text={'Read'}
					size={'medium'}
					className='flex-1'
				/>
				<Icon
					name={isSmashedReadingBooks ? 'x' : 'plus'}
					onPress={() => toggleReadingBooks()}
					size={'medium'}
					className='mb-2 w-[50px]'
					variant={'outlined'}
					color={Color.primary}
				/>
			</View>
			<FlatList
				headerText={'About book'}
				horizontal
				titleMb={8}
				px={16}
				data={book.genres}
				renderItem={({ item: genre }) => (
					<Button
						onPress={() => {
							navigate('Genre', { id: genre.id })
						}}
						variant={'ghost'}
						size={'small'}
						text={genre.name}
					/>
				)}
			/>
			<Description size={18} className='mt-2 px-4' weight={'light'}>
				{book.description}
			</Description>

			<FlatList
				data={book.similarBooks}
				horizontal
				px={16}
				headerText={'Similar book'}
				renderItem={({ item: similarBook }) => (
					<BookCard
						onPress={() => {
							navigate('Book', { id: similarBook.id })
						}}
						image={{ uri: similarBook.picture, size: 'medium' }}
					/>
				)}
			/>
		</BookLayout>
	)
}

export default Book
