import PressableContainer from '@/components/pressable-container/pressable-container'
import FlatList from '@/components/ui/flatlist/flatlist'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ReaderFont } from '@/redux/reading-settings/reading-settings-slice'
import {
	ThemeColor,
	themePack
} from '@/screens/reading/settings/sheet/reading/theme-pack'
import type { LineColorType } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'

const ReadingSettings: FC = () => {
	const { colorScheme, flow, fontFamily, fontSize } = useTypedSelector(
		state => state.readingSettings
	)
	const { changeFlow, changeTheme, changeFontFamily, changeFontSize } =
		useAction()
	return (
		<View>
			<FlatList
				horizontal
				title={{
					color: ThemeColor(colorScheme.theme.p.color) as LineColorType,
					text: 'Theme',
					mb: 6
				}}
				data={themePack}
				renderItem={({ item }) => (
					<PressableContainer
						onPress={() => changeTheme(item)}
						style={[
							{
								backgroundColor: ThemeColor(item.theme.body.background)
							},
							colorScheme.slug === item.slug
								? {
										borderWidth: 1,
										borderColor: ThemeColor(item.theme.p.color)
								  }
								: {}
						]}
						className='h-[105px] w-[110px] justify-end rounded-xl p-2'>
						<Title
							numberOfLines={2}
							weight={'semiBold'}
							size={18}
							style={{ color: ThemeColor(item.theme.p.color) }}>
							{item.title}
						</Title>
					</PressableContainer>
				)}
			/>
			<FlatList
				horizontal
				title={{
					color: ThemeColor(colorScheme.theme.p.color),
					text: 'Font',
					mb: 6
				}}
				data={ReaderFont}
				renderItem={({ item }) => (
					<PressableContainer
						onPress={() => changeFontFamily(item.fontFamily)}
						className='rounded-xl p-1 px-3'
						style={{
							backgroundColor:
								fontFamily === item.fontFamily
									? ThemeColor(colorScheme.theme['::selection'].background)
									: ThemeColor(colorScheme.theme.body.background)
						}}>
						<Title
							weight={'semiBold'}
							color={
								fontFamily === item.fontFamily
									? ThemeColor(colorScheme.theme['::selection'].color)
									: ThemeColor(colorScheme.theme.p.color)
							}>
							{item.title}
						</Title>
					</PressableContainer>
				)}
			/>
		</View>
	)
}

export default ReadingSettings
