import Header from '@/components/header/header'
import ScrollLayout from '@/components/layout/scroll-layout'
import Button from '@/components/ui/button/button'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import BasicSection from '@/screens/profile/update-profile/basic-section/basic-section'
import PasswordSection from '@/screens/profile/update-profile/password-section/password-section'
import { useUploadUserPicture } from '@/screens/profile/update-profile/upload-image'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const UpdateProfile = () => {
	// сделать через парамы чтобы не делать запрос
	const { data: profile } = useQuery(['user-profile'], () =>
		userServices.getProfile()
	)
	if (!profile) return <BigLoader />
	const { toggleUserPicture } = useUploadUserPicture()
	return (
		<ScrollLayout className='p-2'>
			<Header
				leftIcon={{ back: true }}
				rightIcon={{
					element: (
						<Title weight={'bold'} size={28}>
							Account
						</Title>
					)
				}}
			/>

			<View className='mt-8 w-full items-center'>
				<Image
					className='z-50 bg-secondary'
					url={profile.picture}
					height={150}
					width={150}
				/>
				<View className=' w-full px-4 pb-2'>
					<Button
						className='mt-4 w-full'
						variant={'primary'}
						onPress={() => toggleUserPicture()}
						size={'medium'}
						text={'Change photo'}
					/>
				</View>
			</View>
			<BasicSection defaultName={profile.name} defaultEmail={profile.email} />
			<PasswordSection />
		</ScrollLayout>
	)
}

export default UpdateProfile
