import BookCard from '@/components/book-card/book-card'
import LargeHeaderScrollLayout from '@/components/layout/header-scroll-layout/large-header-scroll-layout'
import Button from '@/components/ui/button/button'
import FlatList from '@/components/ui/flatlist/flatlist'
import HamburgerMenu from '@/components/ui/hamburger-menu/hamburger-menu'
import Icon from '@/components/ui/icon/icon'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import Feature from '@/screens/book/feature/feature'
import { bookService } from '@/services/book-service'
import { useQuery } from '@tanstack/react-query'
import { Share, View } from 'react-native'

const Book = () => {
	const { navigate } = useTypedNavigation()
	const { params } = useTypedRoute<'Book'>()
	const { data: book } = useQuery(['book', params.id], () =>
		bookService.byId(+params.id)
	)
	if (!book) return <BigLoader />
	return (
		<LargeHeaderScrollLayout
			type={'background'}
			background={book.color}
			header={{
				rightIcon: {
					name: 'share-android',
					onPress: () =>
						Share.share({
							message: `Wow! I see ${book.title}  book on Booknex and I think you will like it too!`
						})
				}
			}}
			animatedHeader={{
				title: book.title,
				transientValue: 85,
				rightIcon: (
					<HamburgerMenu
						position={'right'}
						elements={[
							{
								title: 'Home',
								onPress: () => {
									console.log('Home')
								}
							},
							{
								title: 'Library',
								onPress: () => {
									console.log('Library')
								}
							}
						]}
					/>
				)
			}}
			title={book.title}
			description={book.author}>
			<View className='flex-row justify-between px-4'>
				<View className='flex-1 justify-between'>
					<Feature
						description={'Duration'}
						icon={'clock'}
						count={`${Math.round(book.pages / 1.5 / 60)}h ${Math.round(
							(book.pages / 1.5) % 60
						)} min`}
					/>
					<Feature description={'Pages'} icon={'book'} count={book.pages} />
					<Feature
						description={'Liked'}
						icon={'thumbsup'}
						count={`${book.likedPercentage}%`}
					/>
				</View>
				<Image
					url={book.image}
					className='z-0 mt-[-50px]'
					height={260}
					width={170}
				/>
			</View>
			<View className='mb-2 flex-row justify-between gap-2 px-4 pt-6'>
				<Button text={'Read'} size={'medium'} className='flex-1' />
				<Icon
					name={'heart'}
					size={'medium'}
					variant={'outlined'}
					className='w-[50px]'
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
				data={book.similarBooks || []}
				horizontal
				px={16}
				headerText={'Similar book'}
				renderItem={({ item: similarBook }) => (
					<BookCard
						onPress={() => {
							navigate('Book', { id: similarBook.id })
						}}
						image={{ uri: similarBook.image, size: 'medium' }}
					/>
				)}
			/>
		</LargeHeaderScrollLayout>
	)
}

export default Book
