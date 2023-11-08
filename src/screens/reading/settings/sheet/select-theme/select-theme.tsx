import PressableContainer from '@/components/pressable-container/pressable-container'
import Flatlist from '@/components/ui/flatlist/flatlist'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { themePack } from '@/screens/reading/settings/sheet/reading/theme-pack'
import type { FC } from 'react'
import { View } from 'react-native'

const SelectTheme: FC = () => {
	const { changeTheme } = useAction()
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	return (
		<Flatlist
			data={themePack}
			className={'px-4'}
			renderItem={({ item: theme }) => {
				return (
					<PressableContainer
						onPress={() => changeTheme(theme.slug)}
						style={{
							borderColor:
								colorScheme.slug === theme.slug
									? colorScheme.colorPalette.text
									: theme.colorPalette.background,
							backgroundColor: theme.colorPalette.background
						}}
						className='mb-2 flex-row items-center justify-between rounded-xl border-2 p-4'>
						<Title
							style={{
								color: theme.colorPalette.text
							}}
							weight={'bold'}
							size={22}>
							{theme.title}
						</Title>
						<View className='flex-row items-center'>
							{Object.values(theme.colorPalette).map(color => {
								return (
									<View
										key={color}
										style={{
											backgroundColor: color
										}}
										className='ml-[-8px] h-8 w-8 rounded-full'
									/>
								)
							})}
						</View>
					</PressableContainer>
				)
			}}
		/>
	)
}

export default SelectTheme
