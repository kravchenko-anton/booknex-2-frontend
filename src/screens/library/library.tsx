import ScrollLayout from '@/components/layout/scroll-layout'
import FlatList from '@/components/ui/flatlist/flatlist'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import BookCarousel from '@/screens/library/book-carousel/book-carousel'
import LibraryListElement from '@/screens/library/library-list-element/library-list-element'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'

const Library = () => {
	const { data: library } = useQuery(['user-library'], () =>
		userServices.getLibrary()
	)
	const { navigate } = useTypedNavigation()
	if (!library) return <BigLoader />
	return (
		<ScrollLayout className='p-2'>
			<Title size={26} weight={'bold'}>
				My books
			</Title>
			<BookCarousel />
			<FlatList
				mt={25}
				scrollEnabled={false}
				headerText={'Books'}
				data={library.books}
				renderItem={({ item }) => (
					<LibraryListElement
						onPress={() => {
							navigate('ComprehensiveList', { type: item.type })
						}}
						icon={item.icon}
						name={item.name}
						count={item.count}
					/>
				)}
			/>
			<FlatList
				mt={25}
				className='mb-5'
				scrollEnabled={false}
				headerText={'Shelves'}
				data={library.shelves}
				renderItem={({ item }) => (
					<LibraryListElement
						onPress={() => {
							navigate('ComprehensiveList', { type: item.type })
						}}
						icon={item.icon}
						name={item.name}
						count={item.count}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Library
