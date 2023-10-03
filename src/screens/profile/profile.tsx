import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import BigLoader from '@/components/ui/loader/big-loader'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
	const { data: profile } = useQuery(['profile'], () =>
		userServices.getProfile()
	)
	if (!profile) return <BigLoader />
	return (
		<Layout>
			<Header
				leftIcon={{ back: true }}
				rightIcon={{
					icon: {
						name: 'pencil'
					}
				}}
			/>
		</Layout>
	)
}

export default Profile
