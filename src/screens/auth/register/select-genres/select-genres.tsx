import Header from '@/components/header/header'
import Button from '@/components/ui/button/button'
import { Title } from '@/components/ui/title/title'
import { popupAnimation } from '@/screens/auth/welcome/popup-animation'
import { GenreType } from '@/services/types/genre-service-types'
import { AnimatedView } from '@/types/component-types'
import { PopupTypes } from '@/types/global'
import { Color } from '@/utils/color'
import { Dispatch, FC, SetStateAction } from 'react'
import { View } from 'react-native'

export interface SelectGenresProps extends PopupTypes<'genres' | 'fields'> {
	genres: GenreType[]
	selectGenres: string[]
	setSelectGenres: Dispatch<SetStateAction<string[]>>
}
const SelectGenres: FC<SelectGenresProps> = ({
	genres,
	isActivePopup,
	setSelectGenres,
	selectGenres,
	setIsActivePopup
}) => {
	const { showAnimation } = popupAnimation(isActivePopup)
	return (
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
				disabled={selectGenres.length < 3}
				variant={'secondary'}
				size={'large'}
				text={'Next step'}
				onPress={() => setIsActivePopup('fields')}
			/>
		</AnimatedView>
	)
}

export default SelectGenres