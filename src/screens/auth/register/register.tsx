import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import FullScreenLoader from '@/components/ui/loader/fullScreenLoader'
import { Title } from '@/components/ui/title/title'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { useRegisterAnimation } from '@/screens/auth/register/animations'
import { genreService } from '@/services/genre-service'
import { AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const Register = () => {
	const {
		params: { defaultEmail }
	} = useTypedRoute<'Registration'>()
	const { data: genres } = useQuery(['genres'], () => genreService.getGenres())
	const [isGenresModal, setIsGenresModal] = useState(false)
	const [selectGenres, setSelectGenres] = useState<string[]>([])
	const { control, handleSubmit } = useForm<{
		name: string
		email: string
		password: string
	}>()
	const { showAnimation, hideAnimation } = useRegisterAnimation(isGenresModal)
	if (!genres) return <FullScreenLoader />
	return (
		<Layout className='h-full'>
			<AnimatedView style={[showAnimation]} className='h-full'>
				<Header leftIcon={{ back: true }} />
				<View>
					<Title size={34} weight={'bold'} className='mb-2' numberOfLines={2}>
						Choose your favorite genres
					</Title>
					<Title size={18} weight={'light'} color={Color.gray} className='mb-4'>
						Select at least 3 genres
					</Title>
				</View>
				<View className='flex w-full flex-row flex-wrap '>
					{genres.map(genre => (
						<Button
							onPress={() =>
								selectGenres.some(g => g === genre.name)
									? setSelectGenres(selectGenres.filter(g => g !== genre.name))
									: setSelectGenres([...selectGenres, genre.name])
							}
							key={genre.id}
							size={'medium'}
							text={genre.name}
							variant={
								selectGenres.some(g => g === genre.name) ? 'primary' : 'dust'
							}
							className='mb-2 mr-3'
						/>
					))}
				</View>
				<Button
					className='mt-auto'
					variant={'secondary'}
					size={'large'}
					text={'Next step'}
					onPress={handleSubmit(data => console.log(data))}
				/>
			</AnimatedView>

			<AnimatedView style={[hideAnimation]}>
				<Header leftIcon={{ back: true }} />
				<Title size={34} weight={'bold'} className='mb-2 mt-[20%]'>
					Welcome to the club
				</Title>
				<Title size={18} weight={'light'} color={Color.gray} className='mb-4'>
					Enter your credentials to continue
				</Title>
				<Field control={control} name={'name'} placeholder={'Name'} />
				<Field
					control={control}
					name={'email'}
					placeholder={'Email'}
					defaultValue={defaultEmail}
				/>
				<Field
					control={control}
					name={'password'}
					placeholder={'Password'}
					secureTextEntry
				/>
				<Button
					size={'large'}
					text={'Next step'}
					onPress={() => setIsGenresModal(true)}
				/>
			</AnimatedView>
		</Layout>
	)
}

export default Register
