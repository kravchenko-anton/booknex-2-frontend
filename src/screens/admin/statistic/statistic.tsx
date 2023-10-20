import BookCard from '@/components/book-card/book-card'
import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { adminService } from '@/services/admin-service'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const Statistic = () => {
	const { data: statistic } = useQuery(['statistic'], () =>
		adminService.statistics()
	)
	// TODO: сделать layout для админки и вынести туда хедер с хамбургером
	if (!statistic) return <BigLoader />
	return (
		<Layout>
			<Header
				left={{
					title: 'Statistic'
				}}
				right={{
					hamburger: {
						elements: [
							{
								title: 'Books',
								onPress: () => {
									console.log('Books')
								}
							},
							{
								title: 'Users',
								onPress: () => {
									console.log('Users')
								}
							},
							{
								title: 'Statistic',
								onPress: () => {
									console.log('Statistic')
								}
							}
						]
					}
				}}
			/>

			<View className='flex-row items-center justify-between gap-4 pt-4'>
				<View className='flex-1 items-center rounded-xl border-2 border-b-black p-2'>
					<Title size={22} weight={'bold'}>
						Users
					</Title>
					<Title size={18} weight={'regular'}>
						{statistic.totalUsers}
					</Title>
				</View>
				<View className='flex-1 items-center rounded-xl border-2 border-b-black p-2'>
					<Title size={22} weight={'bold'}>
						Total Read Time
					</Title>
					<Title size={18} weight={'regular'}>
						{`${Math.round(statistic.totalReadTime / 60 / 60)} hours`}
					</Title>
				</View>
			</View>
			<Title size={24} className='mt-2' weight={'bold'} center>
				Most read books
			</Title>
			<View className='mt-4 flex-row items-center justify-between px-4'>
				{statistic.mostReadBook.map(book => (
					<BookCard
						image={{
							uri: book.picture,
							size: 'medium'
						}}
						key={book.id}
						title={book.title}
					/>
				))}
			</View>
		</Layout>
	)
}

export default Statistic
