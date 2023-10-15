import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import AuthorLayout from '@/screens/author/author-layout/author-layout'
import { authorService } from '@/services/author-service'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const Author = () => {
	const { params } = useTypedRoute<'Author'>()
	const { data: author } = useQuery(['author'], () =>
		authorService.byId(params.id)
	)
	if (!author) return <BigLoader />
	return (
		<AuthorLayout
			name={author.name}
			backgroundColor={author.color}
			picture={author.picture}>
			<View className='mx-2 mt-4 rounded-xl  bg-pale p-4'>
				<Title
					size={22}
					numberOfLines={3}
					className='w-full'
					weight={'regular'}>
					{author.description}
				</Title>
			</View>
		</AuthorLayout>
	)
}

export default Author
