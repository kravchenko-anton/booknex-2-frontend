import VerticalBookCard from '@/components/book-card/vertical-book-card/vertical-book-card'
import Button from '@/components/ui/button/button'
import FlatList from '@/components/ui/flatlist/flatlist'
import Icon from '@/components/ui/icon/icon'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useToggle } from '@/hooks/useToggle/useToggle'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import ShelfLayout from '@/screens/shelf/shelf-layout/shelf-layout'
import { shelfService } from '@/services/shelf-service'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const Shelf = () => {
	const { params } = useTypedRoute<'Shelf'>()
	const { data: shelf } = useQuery(['shelf  ' + params.id], () =>
		shelfService.byId(params.id)
	)
	const {
		handleToggle: handleToggleWatchedShelves,
		isSmashed: isSmashedWatchedShelves
	} = useToggle(
		{
			type: 'watchedShelves',
			id: params.id
		},
		[`shelf  ${params.id}`]
	)
	const {
		handleToggle: handleToggleUnWatchedShelves,
		isSmashed: isSmashedUnwatchedShelves
	} = useToggle(
		{
			type: 'hiddenShelves',
			id: params.id
		},
		[`shelf  ${params.id}`]
	)

	const { navigate } = useTypedNavigation()
	if (!shelf) return <BigLoader />
	return (
		<ShelfLayout title={shelf.title} backgroundImage={shelf.picture}>
			<View className='mx-auto mt-[-40px] w-4/5 flex-row justify-between rounded-xl bg-dust p-2 px-4 pb-1 pt-2'>
				<Button
					variant={isSmashedWatchedShelves ? 'secondary' : 'primary'}
					onPress={() => handleToggleWatchedShelves()}
					className='mr-1.5 flex-1'
					size={'medium'}
					disabled={isSmashedUnwatchedShelves}
					text={isSmashedWatchedShelves ? 'Cancel watching' : 'Start watching'}
				/>
				<Icon
					onPress={() => handleToggleUnWatchedShelves()}
					disabled={isSmashedWatchedShelves}
					name={isSmashedUnwatchedShelves ? 'eye-closed' : 'eye'}
					className='mb-2 w-[50px]'
					size={'medium'}
					variant={'outlined'}
				/>
			</View>
			<View className='flex-row items-center justify-center gap-5 pt-4'>
				{shelf.statistics.map(item => (
					<View className='items-center' key={item.title}>
						<Title size={32} weight={'bold'}>
							{item.count}
						</Title>
						<Title size={22} weight={'regular'}>
							{item.title}
						</Title>
					</View>
				))}
			</View>
			<View className='mx-2 mt-4 rounded-xl  bg-pale p-4'>
				<Title size={22} numberOfLines={3} weight={'regular'}>
					{shelf.description}
				</Title>
			</View>

			<FlatList
				data={shelf.books}
				scrollEnabled={false}
				className='mb-2 px-2'
				renderItem={({ item }) => (
					<VerticalBookCard
						image={{
							uri: item.picture,
							size: 'small'
						}}
						title={item.title}
						author={item.author.name}
						pages={item.pages}
						likedPercentage={item.likedPercentage}
						onPress={() => {
							navigate('Book', { id: item.id })
						}}
					/>
				)}
			/>
		</ShelfLayout>
	)
}

export default Shelf
