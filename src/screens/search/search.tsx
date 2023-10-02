import VerticalBookCard from '@/components/book-card/vertical-book-card/vertical-book-card'
import Layout from '@/components/layout/layout'
import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import FlatList from '@/components/ui/flatlist/flatlist'
import BigLoader from '@/components/ui/loader/big-loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useSearch } from '@/screens/search/useSearch'
import { View } from 'react-native'

const Search = () => {
	const {
		searchTerm,
		books,
		topSearches,
		topSearchesLoading,
		bookLoading,
		control
	} = useSearch()
	const { navigate } = useTypedNavigation()
	return (
		<Layout className='h-full'>
			<Field
				control={control}
				name={'searchTerm'}
				placeholder={'Type something...'}
			/>
			{searchTerm ? (
				<View className='flex-1'>
					{bookLoading ? (
						<BigLoader />
					) : (
						<FlatList
							keyExtractor={item => `$${item.id}`}
							className='w-full flex-grow'
							data={books}
							renderItem={({ item: book }) => (
								<VerticalBookCard
									image={{
										uri: book.image,
										height: 160,
										width: 100
									}}
									title={book.title}
									author={book.author}
									pages={book.pages}
									likedPercentage={book.likedPercentage}
									onPress={() => {
										navigate('Book', { id: book.id })
									}}
								/>
							)}
						/>
					)}
				</View>
			) : topSearchesLoading ? (
				<BigLoader />
			) : (
				<FlatList
					keyExtractor={item => `#${item.id} - ${item.name}`}
					data={topSearches}
					renderItem={({ item }) => (
						<Button
							size={'large'}
							className='items-start'
							variant={'dust'}
							onPress={() => {
								navigate(item.name ? 'Genre' : 'Book', {
									id: item.id
								})
							}}
							text={(item.name ?? item.title) || 'Unknown'}
						/>
					)}
				/>
			)}
		</Layout>
	)
}

export default Search
