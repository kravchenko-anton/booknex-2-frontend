import BookCard from '@/components/book-card/book-card'
import RainbowBookCard from '@/components/book-card/rainbow-book-card/rainbow-book-card'
import Header from '@/components/header/header'
import ScrollLayout from '@/components/layout/scroll-layout'
import Button from '@/components/ui/button/button'
import FlatList from '@/components/ui/flatlist/flatlist'
import FullScreenLoader from '@/components/ui/loader/fullScreenLoader'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import Recommendation from '@/screens/home/components/recommendation/recommendation'
import SearchField from '@/screens/home/components/search-field/search-field'
import { catalogService } from '@/services/catalog-service'
import { removeEmoji } from '@/utils/removeEmoji'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
	const { data: catalog } = useQuery(['catalog'], () =>
		catalogService.catalog()
	)
	const { logout } = useAction()
	if (!catalog) return <FullScreenLoader />
	return (
		<ScrollLayout showsVerticalScrollIndicator={false}>
			<Header
				wrapperClassName='px-2 mb-2'
				leftIcon={{
					custom: (
						<Title weight={'semiBold'} size={30}>
							{new Date().getHours() < 12
								? 'Good morning'
								: new Date().getHours() < 18
								? 'Good afternoon'
								: 'Good evening'}
						</Title>
					)
				}}
				rightIcon={{
					icon: {
						name: `time-outline`
					}
				}}
			/>
			<SearchField />
			<Recommendation data={catalog.recommendations} />
			<FlatList
				horizontal
				data={catalog.mostRelatedGenres}
				renderItem={({ item }) => (
					<Button
						size={'medium'}
						variant={'ghost'}
						text={item.name}
						className='mb-2 mr-2 rounded-3xl bg-white px-4 py-2'
					/>
				)}
			/>
			<FlatList
				headerText={'Best Sellers'}
				horizontal
				data={catalog.bestSellers}
				renderItem={({ item }) => (
					<BookCard image={{ uri: item.image, height: 260, width: 170 }} />
				)}
			/>
			<FlatList
				horizontal
				mt={40}
				data={catalog.popularNow}
				renderItem={({ item }) => (
					<RainbowBookCard
						backgroundColor={item.color}
						image={{ uri: item.image, height: 140, width: 100 }}
						title={item.title}
						description={item.description}
					/>
				)}
			/>
			<FlatList
				headerText={'New Releases'}
				horizontal
				data={catalog.newReleases}
				renderItem={({ item }) => (
					<BookCard image={{ uri: item.image, height: 240, width: 160 }} />
				)}
			/>
			{catalog.genres.map(genre => {
				return (
					<FlatList
						key={genre.name}
						headerText={removeEmoji(genre.name)}
						horizontal
						mt={30}
						data={genre.majorBooks}
						renderItem={({ item }) => (
							<BookCard
								image={{
									uri: item.image,
									height: 180,
									width: 120
								}}
							/>
						)}
					/>
				)
			})}

			<FlatList
				headerText={'In the same breath'}
				horizontal
				// in one item be 3 books
				data={catalog.sameBreath}
				renderItem={({ item }) => (
					<BookCard
						image={{
							uri: item.image,
							height: 260,
							width: 170
						}}
						title={item.title}
						author={item.author}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Home
