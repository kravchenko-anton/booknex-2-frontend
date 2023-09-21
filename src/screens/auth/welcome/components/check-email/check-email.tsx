import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useWelcomeAnimation } from '@/screens/auth/welcome/components/animations'
import { WelcomeElementProps } from '@/screens/auth/welcome/components/types'
import { authService } from '@/services/auth-service'
import { AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import { useDebounce } from '@/utils/useDebounce'
import { useMutation } from '@tanstack/react-query'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const CheckEmail: FC<Pick<WelcomeElementProps, 'isCheckEmailModal'>> = ({
	isCheckEmailModal
}) => {
	const { control, watch } = useForm<{ email: string }>({ mode: 'onChange' })
	const { navigate } = useTypedNavigation()
	const { showAnimation } = useWelcomeAnimation(isCheckEmailModal)
	const emailField = useDebounce(watch('email'), 500)
	const noValidEmail = !!(
		emailField &&
		emailField.length > 4 &&
		emailField.includes('@') &&
		emailField.includes('.')
	)

	const { data: isEmailExists, mutate: checkEmailFunc } = useMutation(
		['check-email'],
		() => authService.checkEmail(emailField)
	)
	useEffect(() => {
		noValidEmail && checkEmailFunc()
		console.log('emailField', noValidEmail && console.log('yes'))
	}, [emailField])

	return (
		<AnimatedView
			style={[
				showAnimation,
				{
					justifyContent: 'center'
				}
			]}>
			<Title
				size={32}
				center
				color={Color.secondary}
				className='mb-4'
				weight={'bold'}>
				Log in or register
			</Title>
			<Field
				control={control}
				name={'email'}
				keyboardType='email-address'
				placeholder={'Enter you Email'}
			/>
			<Button
				size={'medium'}
				disabled={!noValidEmail}
				variant={isEmailExists?.isExist ? 'secondary' : 'primary'}
				className='mt-2'
				width={'100%'}
				onPress={() =>
					navigate(isEmailExists?.isExist ? 'Login' : 'Registration', {
						defaultEmail: emailField
					})
				}
				text={
					!noValidEmail
						? 'continue'
						: isEmailExists?.isExist
						? 'log in'
						: 'register'
				}
			/>
		</AnimatedView>
	)
}

export default CheckEmail
