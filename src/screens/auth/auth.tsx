import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useAuth } from '@/hooks/useAuth'
import { AuthFieldsType } from '@/redux/auth/auth.types'
import { Color } from '@/utils/color'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

const Auth = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true)
	const { user } = useAuth()
	const { register, login } = useAction()
	const { control, handleSubmit } = useForm<AuthFieldsType>({
		mode: 'onSubmit'
	})
	const onSubmit: SubmitHandler<AuthFieldsType> = ({ password, email }) => {
		isLogin ? login({ password, email }) : register({ password, email })
	}
	return (
		<Layout>
			<Header />
			<View className='mt-[20%]'>
				<Title size={34} weight={'bold'} numberOfLines={2} className='mb-2'>
					{isLogin ? 'Welcome back' : 'Create an account'}
				</Title>
				<Title
					size={18}
					weight={'light'}
					numberOfLines={2}
					color={Color.gray}
					className='mb-4'>
					Enter your credentials to continue
				</Title>
				<Field
					control={control}
					name={'email'}
					keyboardType={'email-address'}
					placeholder={'Email'}
					rules={{
						required: {
							value: true,
							message: 'Email is required'
						},
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Entered value does not match email format'
						}
					}}
				/>
				<Field
					control={control}
					name={'password'}
					secureTextEntry={true}
					placeholder={'Password'}
					rules={{
						required: {
							value: true,
							message: 'Password is required'
						},
						minLength: {
							value: 6,
							message: 'Password must have at least 8 characters'
						}
					}}
				/>
				<Button
					onPress={handleSubmit(onSubmit)}
					size={'medium'}
					text={isLogin ? 'Sign in' : 'Sign up'}
					className='mb-4 mt-2'
				/>
				<Title
					size={16}
					weight={'light'}
					center
					color={Color.gray}
					onPress={() => setIsLogin(!isLogin)}>
					{isLogin ? "Don't h" : 'H'}ave an account?{' '}
					<Text className='text-[16px] font-bold text-accent'>
						Sign {isLogin ? 'up' : 'in'}
					</Text>
				</Title>
			</View>
		</Layout>
	)
}

export default Auth
