import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { UserType } from '@/services/types/user-services-types'
import { userServices } from '@/services/user-service'
import { errorCatch } from '@/utils/catch-error'
import { emailRules, nameRules } from '@/utils/input-validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
// TODO: переделать и сделать оч красивый компонент
const BasicSection = ({
	defaultEmail,
	defaultName
}: {
	defaultName: string
	defaultEmail: string
}) => {
	const { control, handleSubmit } = useForm<Pick<UserType, 'email' | 'name'>>()
	const queryClient = useQueryClient()
	const { navigate } = useTypedNavigation()
	const { mutateAsync } = useMutation(
		['update profile bio'],
		(data: Pick<UserType, 'email' | 'name'>) => userServices.updateBio(data),
		{
			onError(error: string) {
				Toast.show({
					text1: 'Update profile',
					text2: errorCatch(error),
					type: 'error'
				})
			},
			async onSuccess() {
				await queryClient.invalidateQueries(['user-profile'])
				Toast.show({
					text1: 'Update profile',
					text2: 'update was successful',
					type: 'success'
				})
				navigate('Profile')
			}
		}
	)
	return (
		<View className='mt-8 rounded-2xl bg-dust p-4'>
			<Title weight={'bold'} className='mb-2' size={24}>
				Basic information
			</Title>
			<Field
				control={control}
				defaultValue={defaultName}
				rules={nameRules}
				name={'name'}
				placeholder={'Name'}
			/>
			<Field
				defaultValue={defaultEmail}
				control={control}
				rules={emailRules}
				name={'email'}
				placeholder={'Email'}
			/>
			<Button
				onPress={handleSubmit(data => mutateAsync(data))}
				className='mt-2'
				text={'Save'}
				variant={'primary'}
				size={'medium'}
			/>
		</View>
	)
}

export default BasicSection
