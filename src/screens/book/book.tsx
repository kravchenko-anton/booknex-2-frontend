import BookCard from '@/components/book-card/book-card'
import Header from '@/components/header/header'
import AnimatedHeader from '@/components/ui/animated-header/animated-header'
import Button from '@/components/ui/button/button'
import FlatList from '@/components/ui/flatlist/flatlist'
import HamburgerMenu from '@/components/ui/hamburger-menu/hamburger-menu'
import Icon from '@/components/ui/icon/icon'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import ScrollView from '@/components/ui/scroll-view/scroll-view'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import Feature from '@/screens/book/feature/feature'
import { bookService } from '@/services/book-service'
import { Color } from '@/utils/color'
import { useQuery } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { Share, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Book = () => {
	const { navigate } = useTypedNavigation()
	const { top } = useSafeAreaInsets()
	const { params } = useTypedRoute<'Book'>()
	const scrollPosition = useSharedValue(0)
	const { data: book } = useQuery(['book', params.id], () =>
		bookService.byId(+params.id)
	)
	if (!book) return <BigLoader />
	return (
		<>
			<StatusBar backgroundColor={Color.canvas} />
			<AnimatedHeader
				transientValue={85}
				title={book.title}
				scrollPosition={scrollPosition}
				rightIcon={{
					element: (
						<HamburgerMenu
							position={'right'}
							color={Color.black}
							// TODO: сделать нормальный список
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
			/>
			<ScrollView
				onLayout={() => {
					scrollPosition.value = 0
				}}
				onScroll={event => {
					scrollPosition.value = event.nativeEvent.contentOffset.y
				}}>
				<View
					style={{
						paddingTop: top,
						backgroundColor: book.color
					}}
					className='h-[250px] p-4'>
					<Header
						leftIcon={{ back: true }}
						color={Color.white}
						rightIcon={{
							icon: {
								name: 'share-android',
								onPress: () =>
									Share.share({
										message: `Wow! I see ${book.title}  book on Booknex and I think you will like it too!`
									})
							}
						}}
					/>
					<Title
						size={26}
						color={Color.white}
						weight={'bold'}
						numberOfLines={2}>
						{book.title}
					</Title>
					<Title
						size={18}
						className='mt-2 w-1/2'
						weight={'bold'}
						color={Color.dust}>
						{book.author}
					</Title>
				</View>
				<View className='flex-row justify-between px-4'>
					<View className='flex-1 justify-between'>
						<Feature
							iconDescription={'Duration'}
							iconName={'clock'}
							iconTitle={`${Math.round(book.pages / 1.5 / 60)}h ${Math.round(
								(book.pages / 1.5) % 60
							)} min`}
						/>
						<Feature
							iconDescription={'Pages'}
							iconName={'book'}
							iconTitle={book.pages}
						/>
						<Feature
							iconDescription={'Liked'}
							iconName={'thumbsup'}
							iconTitle={`${book.likedPercentage}%`}
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
			</ScrollView>
		</>
	)
}

export default Book
