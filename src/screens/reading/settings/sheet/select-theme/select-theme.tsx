import PressableContainer from '@/components/pressable-container/pressable-container'
import Flatlist from '@/components/ui/flatlist/flatlist'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {
	ThemeColor,
	themePack
} from '@/screens/reading/settings/sheet/reading/theme-pack'
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
									? ThemeColor(colorScheme.theme.p.color)
									: ThemeColor(theme.theme.body.background),
							backgroundColor: theme.theme.body.background
						}}
						className='mb-2 flex-row items-center justify-between rounded-xl border-2 p-4'>
						<Title
							style={{
								color: theme.theme.p.color
							}}
							weight={'bold'}
							size={22}>
							{theme.title}
						</Title>
						<View className='flex-row items-center'>
							{theme.colorPalette.map(color => {
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
