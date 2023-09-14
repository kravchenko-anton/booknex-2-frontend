import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import { Title } from '@/components/ui/title/title'
import { catalogService } from '@/services/catalog-service'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
	const { data } = useQuery(['catalog'], () => catalogService.catalog())
	console.log(data)
	return (
		<Layout>
			<Header
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
		</Layout>
	)
}

export default Home
