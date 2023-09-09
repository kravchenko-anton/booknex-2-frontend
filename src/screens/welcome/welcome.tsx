import Layout from '@/components/layout'
import Button from '@/components/ui/button/button'
import { Title } from '@/components/ui/title/title'
import { Color } from '@/utils/color'
import { FC } from 'react'
import { Image, View } from 'react-native'

const Welcome: FC = () => {
	return <Layout className='justify-center p-4 relative'>
	
		<Image source={require('../../../assets/icon.png')} className='h-[180px] w-[180px] rotate-12 mb-[-75px] self-start' />
		
		<View className='bg-white w-full items-center h-1/2 p-4 rounded-3xl'>
			<Title size={36}  color={Color.accent} weight={'bold'}>
				Booknex
			</Title>
			<Title size={17}  color={Color.gray} numberOfLines={10} className='w-full break-all  text-center' weight={'light'}>
				Booknex is your go-to app for reading and discovering books. With a user-friendly interface, it offers an extensive library and personalized book recommendations. Whether you're a seasoned reader or just looking for your next great read, Booknex simplifies the book discovery process and lets you dive right into your favorite stories.
			</Title>
			
			<Button size={'large'} text={'Get Started'} className='mt-auto' width={'100%'} />
		</View>
	</Layout>
}

export default Welcome
