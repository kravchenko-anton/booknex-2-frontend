import Layout from '@/components/layout/layout'
import Button from '@/components/ui/button/button'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Color } from '@/utils/color'
import { FC } from 'react'
import { Image, View } from 'react-native'

const Welcome: FC = () => {
	const { navigate } = useTypedNavigation()

	return (
		<Layout className='relative justify-center p-4'>
			<Image
				source={require('../../../assets/icon.png')}
				className='mb-[-75px] h-[180px] w-[180px] rotate-12 self-start'
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
					onPress={() => navigate('Auth')}
					size={'large'}
					text={'Get Started'}
					className='mt-6'
					width={'100%'}
				/>
			</View>
		</Layout>
	)
}

export default Welcome
