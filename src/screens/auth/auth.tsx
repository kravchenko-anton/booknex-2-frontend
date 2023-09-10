import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import { Color } from '@/utils/color'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

const Auth = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true)
	const {control} = useForm()
	return <Layout>
		<Header />
		<View className='mt-[20%]'>
			<Title size={34} weight={'bold'} numberOfLines={2} className='mb-2'>
				{isLogin ? 'Welcome back' : 'Create an account'}
			</Title>
			<Title size={18} weight={'light'} numberOfLines={2} color={Color.gray} className='mb-4'>
				Enter your credentials to continue
			</Title>
		<Field control={control} name={'email'} keyboardType={'email-address'} placeholder={'Email'}/>
		<Field control={control} name={'password'} secureTextEntry={true} placeholder={'Password'}/>
		<Button size={'medium'} text={isLogin ? 'Sign in' : 'Sign up'} className='mt-2 mb-4'/>
			<Title size={16} weight={'light'} center color={Color.gray} onPress={() => setIsLogin(!isLogin)}>
				{isLogin ? 'H' : "Don't h"}ave an account? <Text className='font-bold text-[16px] text-accent'>Sign {isLogin ? 'up' : 'in'}</Text>
			</Title>
		</View>
	</Layout>
}

export default Auth
