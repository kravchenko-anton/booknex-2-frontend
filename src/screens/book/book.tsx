import Header from '@/components/header/header'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { bookService } from '@/services/book-service'
import { AnimatedScrollView, AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import { shadeRGBColor } from '@/utils/shade.color'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'
import {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
//TODO: доделать анимацию
const Book = () => {
	const { params } = useTypedRoute<'Book'>()
	const { data: book } = useQuery(['book', params.id], () =>
		bookService.byId(params.id)
	)
	const translationY = useSharedValue(0)
	const stylez = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: -translationY.value
				}
			]
		}
	})
	const stylez2 = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: translationY.value / 1.2
				}
			]
		}
	})
	const scrollHandler = useAnimatedScrollHandler(event => {
		console.log(event.contentOffset.y)
		translationY.value = event.contentOffset.y
	})
	const { navigate } = useTypedNavigation()
	const { top } = useSafeAreaInsets()
	if (!book) return <BigLoader />
	return (
		<AnimatedScrollView onScroll={scrollHandler}>
			<AnimatedView
				style={[
					{
						height: 440,
						paddingTop: top,
						paddingHorizontal: 8,
						backgroundColor: shadeRGBColor(book.color, -20)
					}
				]}>
				<AnimatedView style={stylez2}>
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
				</AnimatedView>
				<Image
					url={book.image}
					className='items-center justify-center self-center'
					height={280}
					width={180}
					resizeMode='cover'
				/>
			</AnimatedView>

			<AnimatedView
				style={stylez}
				className='mb-4 mt-[-15px] rounded-t-2xl  bg-dust pt-4'>
				{
					// content
				}
				<View className='h-[15000px] bg-highlight' />
			</AnimatedView>
		</AnimatedScrollView>
	)
}

export default Book

// Header: 			<AnimatedView
// 				style={[stylez3]}
// 				className=' top-0 z-50 w-full flex-row items-center justify-between bg-white p-0 px-2'>
// 				<View className='flex-row items-center'>
// 					<Icon name={'arrow-left'} size={'medium'} />
// 					<Title
// 						size={18}
// 						weight={'bold'}
// 						className='mb-1 w-3/4'
// 						color={Color.black}>
// 						{book.title}
// 					</Title>
// 				</View>
// 				<Icon name={'three-bars'} size={'medium'} />
// 			</AnimatedView>

//<View className='px-2'>
// 					<Title size={34} weight={'bold'} numberOfLines={2}>
// 						{book.title}
// 					</Title>
// 					<Title
// 						size={18}
// 						weight={'light'}
// 						color={Color.gray}
// 						className='mb-2 mt-1'>
// 						{book.author}
// 					</Title>
// 				</View>
// 				<View className='mb-2 flex-row justify-between gap-2 px-2'>
// 					<Button text={'Read'} size={'medium'} className='flex-1' />
// 					<Icon
// 						name={'heart'}
// 						size={'medium'}
// 						variant={'outlined'}
// 						className='w-[50px]'
// 					/>
// 				</View>
// 				<View className='flex-row items-center justify-between gap-2 px-2'>
// 					<Button
// 						text={`👍 ${book.likedPercent}% liked`}
// 						size={'small'}
// 						className='flex-1'
// 						variant={'pale'}
// 					/>
// 					<Button
// 						text={`📖 ${book.pages} pages`}
// 						size={'small'}
// 						className='flex-1'
// 						variant={'pale'}
// 					/>
// 					<Button
// 						text={`⌛ ${Math.round(book.pages / 25)}h read`}
// 						className='flex-1'
// 						size={'small'}
// 						variant={'pale'}
// 					/>
// 				</View>
// 				<FlatList
// 					headerText={'About book'}
// 					horizontal
// 					titleMb={8}
// 					data={book.genres}
// 					renderItem={({ item: genre }) => (
// 						<Button variant={'ghost'} size={'small'} text={genre.name} />
// 					)}
// 				/>
// 				<Title
// 					size={18}
// 					numberOfLines={20}
// 					className='mt-2 px-2'
// 					weight={'light'}>
// 					{book.description}
// 				</Title>
//
// 				<FlatList
// 					data={book.similarBooks || []}
// 					horizontal
// 					headerText={'Similar book'}
// 					renderItem={({ item: similarBook }) => (
// 						<BookCard
// 							onPress={() => navigate('Book', { id: similarBook.id })}
// 							image={{ uri: similarBook.image, height: 230, width: 150 }}
// 						/>
// 					)}
// 				/>
