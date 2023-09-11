import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import { Title } from '@/components/ui/title/title'

const Home = () => {
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
