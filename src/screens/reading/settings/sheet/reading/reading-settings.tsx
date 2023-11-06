import PressableContainer from '@/components/pressable-container/pressable-container'
import { BottomSheetListEnum } from '@/components/ui/bottom-sheet/bottom-sheet-list'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import FontSettings from '@/screens/reading/settings/sheet/reading/font-settings/font-settings'
import {
	ThemeColor,
	themePack
} from '@/screens/reading/settings/sheet/reading/theme-pack'
import type { LineColorType } from '@/utils/color'
import { shadeRGBColor } from '@/utils/shade-color'
import type { FC } from 'react'
import { Switch, View } from 'react-native'

const ReadingSettings: FC = () => {
	const { colorScheme, flow } = useTypedSelector(state => state.readingSettings)
	const { changeFlow, changeTheme, openBottomSheet } = useAction()
	return (
		<View className='px-6'>
			<View className='mt-4 flex-row items-center justify-between'>
				{[
					...themePack.slice(0, 3).map(theme => {
						return (
							<PressableContainer
								key={`${theme.slug}-${theme.title}`}
								style={{
									backgroundColor: ThemeColor(theme.theme.body.background),
									borderColor:
										colorScheme.slug === theme.slug
											? ThemeColor(colorScheme.theme.p.color)
											: ThemeColor(theme.theme.body.background)
								}}
								onPress={() => changeTheme(theme.slug)}
								className='rounded-xl border-2 p-2 px-4'>
								<Title
									weight={'semiBold'}
									size={18}
									style={{ color: ThemeColor(theme.theme.p.color) }}>
									{theme.title}
								</Title>
							</PressableContainer>
						)
					}),
					<PressableContainer
						key={'other theme'}
						style={{
							backgroundColor: '#1f1f28'
						}}
						onPress={() =>
							openBottomSheet(BottomSheetListEnum.readerSelectTheme)
						}
						className='flex-row items-center rounded-xl p-2 px-4'>
						<Title
							color={'#dcd7ba' as LineColorType}
							weight={'semiBold'}
							size={18}>
							{'Other'}
						</Title>
						<Icon
							noPadding
							name='chevron-right'
							size='medium'
							className='ml-2 h-6 w-3.5'
							color={'#dcd7ba' as LineColorType}
						/>
					</PressableContainer>
				]}
			</View>
			<FontSettings />
			<View className='mt-4 flex-row items-center justify-center'>
				<Title weight={'bold'} color={ThemeColor(colorScheme.theme.p.color)}>
					Scrolling
				</Title>
				<Switch
					className='m-0 ml-3 mt-1.5 p-0'
					trackColor={{
						false: ThemeColor(colorScheme.theme.p.color),
						true: shadeRGBColor(ThemeColor(colorScheme.theme.h1.color), -10)
					}}
					thumbColor={
						flow === 'paginated'
							? ThemeColor(colorScheme.theme.p.color)
							: ThemeColor(colorScheme.theme.h1.color)
					}
					onValueChange={() => {
						console.log(flow)
						changeFlow(flow === 'paginated' ? 'scrolled' : 'paginated')
					}}
					value={flow !== 'paginated'}
				/>
			</View>
		</View>
	)
}

export default ReadingSettings
