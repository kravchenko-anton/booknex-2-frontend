import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { AuthFieldsType } from '@/redux/auth/auth.types'
import { Color } from '@/utils/color'
import { SubmitHandler, useForm } from 'react-hook-form'
import { View } from 'react-native'

const Login = () => {
	const {
		params: { defaultEmail }
	} = useTypedRoute<'Login'>()
	const { login } = useAction()
	const { control, handleSubmit } = useForm<AuthFieldsType>({
		mode: 'onSubmit'
	})
	const onSubmit: SubmitHandler<AuthFieldsType> = ({ password, email }) =>
		login({ password, email })
	return (
		<Layout>
			<Header leftIcon={{ back: true }} />
			<View className='mt-[20%]'>
				<Title size={34} weight={'bold'} className='mb-2'>
					Welcome back
				</Title>
				<Title size={18} weight={'light'} color={Color.gray} className='mb-4'>
					Enter your credentials to continue
				</Title>
				<Field
					control={control}
					defaultValue={defaultEmail}
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
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Password must have at least 8 characters'
						},
						maxLength: {
							value: 25,
							message: 'Password must have at most 25 characters'
						}
					}}
				/>
				<Button
					onPress={handleSubmit(onSubmit)}
					size={'medium'}
					text={'Sign in'}
					className='mb-4 mt-2'
				/>
			</View>
		</Layout>
	)
}

export default Login
