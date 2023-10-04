import Layout from '@/components/layout/layout'
import { Title } from '@/components/ui/title/title'

const Library = () => {
	// TODO: сделать тут список последних книг, получение их из storage и показ их и процентов прочтения
	return (
		<Layout>
			<Title size={26} weight={'bold'}>
				My books
			</Title>
		</Layout>
	)
}

export default Library
