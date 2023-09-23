import Header from '@/components/header/header'
import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { popupAnimation } from '@/screens/auth/welcome/popup-animation'
import { UserUpdateDto } from '@/services/types/user-services-types'
import { AnimatedView } from '@/types/component-types'
import { PopupTypes } from '@/types/global'
import { Color } from '@/utils/color'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

export interface EnterFieldProps extends PopupTypes<'genres' | 'fields'> {
	defaultEmail: string
	selectGenres: string[]
}
const EnterField: FC<EnterFieldProps> = ({
	isActivePopup,
	defaultEmail,
	selectGenres,
	setIsActivePopup
}) => {
	const { register } = useAction()
	const { control, handleSubmit } = useForm<Omit<UserUpdateDto, 'picture'>>()
	const onSubmit = (data: Omit<UserUpdateDto, 'picture'>) => {
		if (!selectGenres.length || selectGenres.length < 3) return
		register({ ...data, genres: selectGenres })
	}
	const { showAnimation } = popupAnimation(isActivePopup)
	return (
		<AnimatedView style={[showAnimation]}>
			<Header
				leftIcon={{
					icon: {
						name: 'x',
						color: Color.black,
						onPress: () => setIsActivePopup('genres')
					}
				}}
			/>
			<Title size={34} weight={'bold'} className='mb-2 mt-[20%]'>
				Tell us about yourself
			</Title>
			<Title size={18} weight={'light'} color={Color.gray} className='mb-4'>
				Enter your credentials to continue
			</Title>
			<Field control={control} name={'name'} placeholder={'Name'} />
			<Field
				control={control}
				name={'email'}
				keyboardType={'email-address'}
				rules={{
					required: 'Email is required',
					pattern: {
						value: /\S+@\S+\.\S+/,
						message: 'Entered value does not match email format'
					}
				}}
				placeholder={'Email'}
				defaultValue={defaultEmail}
			/>
			<Field
				control={control}
				name={'password'}
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
				placeholder={'Password'}
				secureTextEntry
			/>
			<Button
				size={'large'}
				text={'Sign up'}
				onPress={handleSubmit(onSubmit)}
			/>
		</AnimatedView>
	)
}

export default EnterField
