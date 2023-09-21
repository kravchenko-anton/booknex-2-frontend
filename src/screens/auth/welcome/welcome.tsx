import Layout from '@/components/layout/layout'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import CheckEmail from '@/screens/auth/welcome/components/check-email/check-email'
import DescriptionCard from '@/screens/auth/welcome/components/description-card/description-card'
import { FC, useState } from 'react'

const Welcome: FC = () => {
	const { navigate } = useTypedNavigation()

	const [isCheckEmailModal, setIsCheckEmailModal] = useState(false)

	return (
		<Layout className='relative justify-center p-4'>
			<DescriptionCard
				isCheckEmailModal={isCheckEmailModal}
				setIsCheckEmailModal={setIsCheckEmailModal}
			/>
			<CheckEmail isCheckEmailModal={isCheckEmailModal} />
		</Layout>
	)
}

export default Welcome
