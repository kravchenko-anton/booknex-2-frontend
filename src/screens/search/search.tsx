import Layout from '@/components/layout/layout'
import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useSearch } from '@/screens/search/useSearch'
import { Color } from '@/utils/color'
import { FlatList, Pressable, View } from 'react-native'

const Search = () => {
	const {
		searchTerm,
		books = [],
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
			{!!searchTerm ? (
				<View className='flex-1'>
					{bookLoading ? (
						<BigLoader />
					) : (
						<FlatList
							showsVerticalScrollIndicator={false}
							renderToHardwareTextureAndroid={true}
							initialNumToRender={10}
							maxToRenderPerBatch={10}
							style={{
								flexGrow: 1,
								width: '100%'
							}}
							data={books}
							renderItem={({ item: book }) => (
								<View className='mb-2 h-[170px] w-full  flex-row rounded-lg bg-dust p-2'>
									<Image
										url={book.image}
										height={160}
										fullSize={true}
										width={100}
									/>
									<View className='h-[170px] flex-1 p-3 pb-0'>
										<View>
											<Title size={22} weight='bold' numberOfLines={2}>
												{book.title}
											</Title>
											<Title
												size={16}
												weight='light'
												className='mb-2 mt-1'
												color={Color.gray}>
												{book.author}
											</Title>
										</View>
										<View className='flex-row items-center gap-2'>
											<Button
												variant={'ghost'}
												size={'small'}
												text={`👍 ${book.likedPercent}% liked`}
											/>
											<Button
												variant={'ghost'}
												size={'small'}
												text={`📖 ${book.pages} pages`}
											/>
										</View>
									</View>
								</View>
							)}
						/>
					)}
				</View>
			) : !topSearchesLoading ? (
				<FlatList
					className='mt-2'
					showsVerticalScrollIndicator={false}
					renderToHardwareTextureAndroid={true}
					initialNumToRender={10}
					maxToRenderPerBatch={10}
					data={topSearches}
					renderItem={({ item }) => (
						<Pressable
							onPress={() =>
								navigate(item.name ? 'Genre' : 'Book', {
									id: item.id
								})
							}
							className='mb-2 h-[65px] w-full justify-center rounded-xl  bg-dust p-2'>
							<Title size={20} weight='bold'>
								{item.name || item.title}
							</Title>
						</Pressable>
					)}
				/>
			) : (
				<BigLoader />
			)}
		</Layout>
	)
}

export default Search
