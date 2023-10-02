import image from '@/../assets/icon.png'
import Button from '@/components/ui/button/button'
import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import { popupAnimation } from '@/screens/auth/welcome/popup-animation'
import { WelcomeElementProperties } from '@/screens/auth/welcome/welcome-types'
import { AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'

const DescriptionCard: FC<WelcomeElementProperties> = ({
	setIsActivePopup,
	isActivePopup
}) => {
	const { showAnimation } = popupAnimation(isActivePopup)
	console.log('isActivePopup DescriptionCard', isActivePopup)
	return (
		<AnimatedView style={showAnimation}>
			<Image
				className='mb-[-75px] rotate-12 self-start'
				width={180}
				height={180}
				url={image as string}
			/>

			<View className='w-full items-center rounded-3xl bg-white p-4'>
				<Title
					size={36}
					color={Color.secondary}
					className='mb-2'
					weight={'bold'}>
					Booknex
				</Title>
				<Title
					size={16}
					color={Color.gray}
					numberOfLines={10}
					className='w-full  text-center'
					weight={'light'}>
					Booknex is your go-to app for reading and discovering books. With a
					user-friendly interface, it offers an extensive library and
					personalized book recommendations. Whether you're a seasoned reader or
					just looking for your next great read, Booknex simplifies the book
					discovery process and lets you dive right into your favorite stories.
				</Title>

				<Button
					onPress={() => {
						setIsActivePopup('check-email')
					}}
					size={'large'}
					text={'Get Started'}
					className=' mt-6'
					width={'100%'}
				/>
			</View>
		</AnimatedView>
	)
}

export default DescriptionCard
