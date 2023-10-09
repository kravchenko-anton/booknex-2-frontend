import VerticalBookCard from '@/components/book-card/vertical-book-card/vertical-book-card'
import LargeHeaderScrollLayout from '@/components/layout/header-scroll-layout/large-header-scroll-layout'
import FlatList from '@/components/ui/flatlist/flatlist'
import HamburgerMenu from '@/components/ui/hamburger-menu/hamburger-menu'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { shelfService } from '@/services/shelf-service'
import { useQuery } from '@tanstack/react-query'
import { Share, View } from 'react-native'

const Shelf = () => {
	const { params } = useTypedRoute<'Shelf'>()
	const { data: shelf } = useQuery(['shelf  ' + params.id], () =>
		shelfService.byId(params.id)
	)
	const { navigate } = useTypedNavigation()
	if (!shelf) return <BigLoader />
	return (
		<LargeHeaderScrollLayout
			type={'image'}
			background={shelf.image}
			header={{
				rightIcon: {
					name: 'share-android',
					onPress: () =>
						Share.share({
							message: `Wow! I see ${shelf?.title} shelf on Booknex! Check it out`
						})
				}
			}}
			animatedHeader={{
				title: shelf.title,
				transientValue: 85,
				rightIcon: (
					<HamburgerMenu
						position={'right'}
						elements={[
							// TODO: сделать тут список для shelf
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
			title={shelf.title}>
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
				<Title size={22} numberOfLines={20} weight={'regular'}>
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
							uri: item.image,
							size: 'small'
						}}
						title={item.title}
						author={item.author}
						pages={item.pages}
						likedPercentage={item.likedPercentage}
						onPress={() => {
							navigate('Book', { id: item.id })
						}}
					/>
				)}
			/>
		</LargeHeaderScrollLayout>
	)
}

export default Shelf
