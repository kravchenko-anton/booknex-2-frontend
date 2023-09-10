import Layout from '@/components/layout/layout'
import Button from '@/components/ui/button/button'
import { useAction } from '@/hooks/useAction'

const Home = () => {
	const { logout } = useAction()
	return (
		<Layout>
			<Button size={'large'} text={'Logout'} onPress={logout} />
		</Layout>
	)
}

export default Home
