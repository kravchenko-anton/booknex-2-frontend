import VerticalCard from '@/components/book-card/vertical-card/vertical-card'
import Field from '@/components/ui/field/field'
import FlatList from '@/components/ui/flatlist/flatlist'
import Icon from '@/components/ui/icon/icon'
import BigLoader from '@/components/ui/loader/big-loader'
import AdminLayout from '@/screens/admin/admin-layout/admin-layout'
import { bookService } from '@/services/book-service'
import { Color } from '@/utils/color'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const AdminBooks = () => {
	const { data: BookList, fetchNextPage } = useInfiniteQuery(
		['admin-books'],
		({ pageParam }) => bookService.all(pageParam as number),
		{
			getNextPageParam: lastPage => {
				if (lastPage.length === 0 || lastPage.length === 1) return
				return Number(lastPage.at(-1)?.id! + 1)
			}
		}
	)
	const { control } = useForm({
		defaultValues: {
			Search: ''
		}
	})
	if (!BookList) return <BigLoader />
	return (
		<AdminLayout title={'Book'}>
			<FlatList
				mt={0}
				ListHeaderComponent={() => (
					<View className='flex-row items-center justify-between'>
						<Field
							wrapperClassName={'flex-1 mr-2'}
							control={control}
							name={'Search'}
							placeholder={'Search'}
						/>
						<Icon
							backgroundColor={Color.primary}
							name={'plus'}
							className='w-[50px]'
							size={'medium'}
							color={Color.white}
						/>
					</View>
				)}
				onEndReached={() => fetchNextPage()}
				data={BookList.pages.flat()}
				renderItem={({ item: book }) => (
					<VerticalCard
						image={{
							uri: book.picture,
							size: 'medium'
						}}
						buttons={[
							{
								label: 'Edit',
								onPress: () => console.log('edit'),
								backgroundColor: Color.highlight,
								color: Color.black
							},
							{
								label: 'Delete',
								onPress: () => console.log('delete'),
								backgroundColor: Color.alert,
								color: Color.white
							}
						]}
						title={book.title}
						description={book.author.name}
					/>
				)}
			/>
		</AdminLayout>
	)
}

export default AdminBooks
