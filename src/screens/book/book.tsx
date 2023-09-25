import BookCard from '@/components/book-card/book-card'
import Header from '@/components/header/header'
import Button from '@/components/ui/button/button'
import FlatList from '@/components/ui/flatlist/flatlist'
import Icon from '@/components/ui/icon/icon'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import ScrollView from '@/components/ui/scroll-view/scroll-view'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { headerAnimation } from '@/screens/book/header-animation'
import { bookService } from '@/services/book-service'
import { AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import { shadeRGBColor } from '@/utils/shade.color'
import { useQuery } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Book = () => {
	const { navigate, goBack } = useTypedNavigation()
	const { top } = useSafeAreaInsets()
	const { params } = useTypedRoute<'Book'>()
	console.log(typeof params.id)
	const { data: book } = useQuery(['book', params.id], () =>
		bookService.byId(+params.id)
	)
	const scrollPosition = useSharedValue(0)
	const { headerStyle } = headerAnimation(scrollPosition)
	if (!book) return <BigLoader />
	return (
		<>
			<StatusBar backgroundColor={Color.canvas} />
			<AnimatedView
				className='px-4'
				style={[
					{
						paddingTop: top / 1.6
					},
					headerStyle
				]}>
				<Header
					leftIcon={{
						custom: (
							<View className='flex-row items-center'>
								<Icon
									name={'arrow-left'}
									onPress={() => goBack()}
									className='pl-0'
									size={'medium'}
								/>
								<Title size={18} className='w-3/4' weight={'bold'}>
									{book.title}
								</Title>
							</View>
						)
					}}
					color={Color.black}
					rightIcon={{
						icon: {
							name: 'three-bars'
						}
					}}
				/>
			</AnimatedView>
			<ScrollView
				onScroll={event => {
					scrollPosition.value = event.nativeEvent.contentOffset.y
				}}>
				<View
					style={{
						paddingTop: top,
						backgroundColor: shadeRGBColor(book.color, -30),
						height: 230,
						borderBottomLeftRadius: 20
					}}
					className='p-4'>
					<Header
						wrapperClassName=' z-10 mx-2'
						leftIcon={{ back: true }}
						color={Color.white}
						rightIcon={{
							icon: {
								name: 'three-bars'
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
					<Title size={18} className='mt-2' weight={'bold'} color={Color.dust}>
						{book.author}
					</Title>
				</View>
				<View className='flex-row justify-between px-4'>
					<View className='flex-1 justify-between'>
						<View className='flex-row items-center'>
							<Icon name={'clock'} size={'large'} className='pl-0' />
							<View>
								<Title size={22} weight={'bold'}>
									{Math.round(book.pages / 25)}h{' '}
									{Math.round((book.pages / 25) % 60)} min
								</Title>
								<Title size={15} weight={'regular'}>
									Duration
								</Title>
							</View>
						</View>
						<View className='flex-row items-center'>
							<Icon name={'book'} size={'large'} className='pl-0' />
							<View>
								<Title size={22} weight={'bold'}>
									{book.pages}
								</Title>
								<Title size={15} weight={'regular'}>
									Pages
								</Title>
							</View>
						</View>
						<View className='flex-row items-center'>
							<Icon name={'thumbsup'} size={'large'} className='pl-0' />
							<View>
								<Title size={22} weight={'bold'}>
									{book.likedPercent}%
								</Title>
								<Title size={15} weight={'regular'}>
									Liked
								</Title>
							</View>
						</View>
					</View>
					<Image
						url={book.image}
						className='mt-[-50px]'
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
						<Button variant={'ghost'} size={'small'} text={genre.name} />
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
							onPress={() => navigate('Book', { id: similarBook.id })}
							image={{ uri: similarBook.image, height: 230, width: 150 }}
						/>
					)}
				/>
			</ScrollView>
		</>
	)
}

export default Book
