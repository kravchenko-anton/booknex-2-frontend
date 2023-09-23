import Layout from '@/components/layout/layout'
import Field from '@/components/ui/field/field'
import Tabs from '@/components/ui/tabs/tabs'
import { Title } from '@/components/ui/title/title'
import { useSearch } from '@/screens/search/useSearch'
import { FlatList, View } from 'react-native'

const Search = () => {
	const { searchTerm, books, isLoading, control } = useSearch()

	return (
		<Layout>
			<Field
				control={control}
				name={'searchTerm'}
				placeholder={'Type something...'}
			/>
			<Tabs
				className='mt-2'
				routes={[
					{
						key: 'books',
						title: 'Books',
						component: (
							<FlatList
								className='h-full w-full bg-secondary'
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								data={books}
								renderItem={({ item }) => {
									return (
										<View>
											<Title>{item.title}</Title>
										</View>
									)
								}}
							/>
						)
					},
					{
						key: 'authors',
						title: 'Authors',
						component: (
							<FlatList
								className='h-full w-full bg-alert'
								data={books}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								renderItem={({ item }) => {
									return (
										<View>
											<Title>{item.author}</Title>
										</View>
									)
								}}
							/>
						)
					},
					{
						key: 'Publishers',
						title: 'Publishers',
						component: (
							<FlatList
								data={books}
								className='h-full w-full bg-highlight'
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								renderItem={({ item }) => {
									return (
										<View>
											<Title>{item.author}</Title>
										</View>
									)
								}}
							/>
						)
					},
					{
						key: 'other',
						title: 'Other',
						component: (
							<FlatList
								data={books}
								className='h-full w-full bg-gray'
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								renderItem={({ item }) => {
									return (
										<View>
											<Title>{item.author}</Title>
										</View>
									)
								}}
							/>
						)
					}
				]}
			/>
		</Layout>
	)
}

export default Search
