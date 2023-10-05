import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { UserUpdatePasswordDto } from '@/services/types/user-services-types'
import { userServices } from '@/services/user-service'
import { errorCatch } from '@/utils/catch-error'
import { passwordRules } from '@/utils/input-validation'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'

const PasswordSection = () => {
	const { control, handleSubmit } = useForm<UserUpdatePasswordDto>()
	const { navigate } = useTypedNavigation()
	const { mutateAsync } = useMutation(
		['update profile password'],
		(data: UserUpdatePasswordDto) => userServices.updatePassword(data),
		{
			onError(error: string) {
				Toast.show({
					text1: 'Update profile',
					text2: errorCatch(error),
					type: 'error'
				})
			},
			onSuccess() {
				Toast.show({
					text1: 'Password update',
					text2: 'successful',
					type: 'success'
				})
				navigate('Profile')
			}
		}
	)
	return (
		<View className='mb-4 mt-8 rounded-2xl bg-dust p-4'>
			<Title weight={'bold'} className='mb-2' size={24}>
				Password
			</Title>
			<Field
				control={control}
				name={'oldPassword'}
				secureTextEntry={true}
				rules={passwordRules}
				placeholder={'Old password'}
			/>
			<Field
				control={control}
				name={'password'}
				secureTextEntry={true}
				rules={passwordRules}
				placeholder={'New password'}
			/>

			<Button
				className='mt-2'
				onPress={handleSubmit(data => {
					mutateAsync(data)
				})}
				text={'Save'}
				variant={'primary'}
				size={'medium'}
			/>
		</View>
	)
}

export default PasswordSection
