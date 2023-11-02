import PressableContainer from '@/components/pressable-container/pressable-container'
import FlatList from '@/components/ui/flatlist/flatlist'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {
	ReaderFontTitle,
	ThemeColor
} from '@/redux/reading-settings/reading-settings-slice'
import { themePack } from '@/screens/reading/settings/sheet/reading/theme-pack'
import type { LineColorType } from '@/utils/color'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'

const ReadingSettings: FC = () => {
	const { theme, flow, fontFamily, fontSize } = useTypedSelector(
		state => state.readingSettings
	)
	const { changeFlow, changeTheme, changeFontFamily, changeFontSize } =
		useAction()
	console.log(fontFamily)
	return (
		<View>
			<FlatList
				horizontal
				title={{
					color: ThemeColor(theme.p.color) as LineColorType,
					text: 'Theme',
					mb: 6
				}}
				data={themePack}
				renderItem={({ item }) => {
					console.log(item.title, 'background')
					return (
						<PressableContainer
							onPress={() => changeTheme(item.theme)}
							style={{
								backgroundColor: ThemeColor(item.theme.body.background)
							}}
							className='h-[100px] w-[100px] justify-end rounded-xl p-2'>
							<Title
								numberOfLines={2}
								weight={'semiBold'}
								style={{ color: ThemeColor(item.theme.p.color) }}>
								{item.title}
							</Title>
						</PressableContainer>
					)
				}}
			/>
			<FlatList
				horizontal
				title={{
					color: ThemeColor(theme.p.color),
					text: 'Font',
					mb: 6
				}}
				data={ReaderFontTitle}
				renderItem={({ item }) => (
					<PressableContainer>
						<Title
							weight={'semiBold'}
							onPress={() => changeFontFamily(item.fontFamily)}
							style={{
								backgroundColor:
									fontFamily === item.fontFamily ? Color.primary : Color.white,
								color:
									fontFamily === item.fontFamily ? Color.white : Color.black
							}}
							className='rounded-xl p-1 px-3'>
							{item.title}
						</Title>
					</PressableContainer>
				)}
			/>
		</View>
	)
}

export default ReadingSettings
