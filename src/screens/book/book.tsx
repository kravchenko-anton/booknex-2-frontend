import BookCard from '@/components/book-card/book-card'
import Button from '@/components/ui/button/button'
import FlatList from '@/components/ui/flatlist/flatlist'
import Icon from '@/components/ui/icon/icon'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import BookLayout from '@/screens/book/book-layout/book-layout'
import { useBookLayoutSettings } from '@/screens/book/book-layout/book-settings'
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
	if (!book) return <BigLoader />
	const {
		shareFunction,
		toggleReadingBooks,
		isSmashedReadingBooks,
		statistics,
		hamburgerMenuElements
	} = useBookLayoutSettings({
		id: book.id,
		title: book.title,
		pages: book.pages,
		likedPercentage: book.likedPercentage
	})
	return (
		<BookLayout
			title={book.title}
			backgroundColor={book.color}
			hamburgerMenuElements={hamburgerMenuElements}
			shareFunction={shareFunction}
			author={book.author}>
			<View className='flex-row justify-between px-4'>
				<View className='flex-1 justify-between'>
					{statistics.map(statistic => (
						<StatisticCard
							key={statistic.title}
							description={statistic.title}
							icon={statistic.icon}
							count={statistic.count}
						/>
					))}
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
			<Title
				size={18}
				numberOfLines={60}
				className='mt-2 px-4'
				weight={'light'}>
				{book.description}
			</Title>

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
