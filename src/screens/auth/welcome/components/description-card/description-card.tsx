import Button from '@/components/ui/button/button'
import { Title } from '@/components/ui/title/title'
import { useWelcomeAnimation } from '@/screens/auth/welcome/components/animations'
import { WelcomeElementProps } from '@/screens/auth/welcome/components/types'
import { AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import { FC } from 'react'
import { Image, View } from 'react-native'

const DescriptionCard: FC<WelcomeElementProps> = ({
	isCheckEmailModal,
	setIsCheckEmailModal
}) => {
	const { hideAnimation } = useWelcomeAnimation(isCheckEmailModal)
	return (
		<AnimatedView style={[hideAnimation]}>
			<Image
				source={require('../../../../../../assets/icon.png')}
				className='mb-[-75px] h-[180px] w-[180px] rotate-12 self-start'
			/>

			<View className='z-50 w-full items-center rounded-3xl bg-white p-4'>
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
					onPress={() => setIsCheckEmailModal(true)}
					size={'large'}
					text={'Get Started'}
					className='relative z-50 mt-6'
					width={'100%'}
				/>
			</View>
		</AnimatedView>
	)
}

export default DescriptionCard
