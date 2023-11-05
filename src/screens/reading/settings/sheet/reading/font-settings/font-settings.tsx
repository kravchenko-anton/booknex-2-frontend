import Icon from '@/components/ui/icon/icon'
import Select from '@/components/ui/select/select'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ReaderFont } from '@/redux/reading-settings/reading-settings-slice'
import LineHeightIcon from '@/screens/reading/settings/sheet/reading/font-settings/icons/line-height'
import PageMarginIcon from '@/screens/reading/settings/sheet/reading/font-settings/icons/page-margin'
import { ThemeColor } from '@/screens/reading/settings/sheet/reading/theme-pack'
import type { FC } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const FontSettings: FC = () => {
	const { colorScheme, padding, lineHeight, font, fontSize } = useTypedSelector(
		state => state.readingSettings
	)
	const { changePadding, changeLineHeight, changeFontSize } = useAction()
	console.log(FontSettings)
	return (
		<View className='px-4'>
			<View className='mt-4 w-full flex-row  items-center justify-between'>
				<Select
					onSelect={value => {
						console.log(value)
					}}
					color={ThemeColor(colorScheme.theme.p.color)}
					backgroundColor={ThemeColor(colorScheme.theme.body.background)}
					elements={ReaderFont.map(font => {
						return {
							value: font.fontFamily,
							label: font.title
						}
					})}
					activeTitle={font.title}
				/>

				<View className='flex-row items-center'>
					<TouchableOpacity>
						<Icon
							className='w-[60px] rounded-r-none border-r-0 p-1'
							style={{
								borderColor: ThemeColor(
									colorScheme.theme[fontSize === 10 ? 'h1' : 'p'].color
								)
							}}
							onPress={() => {
								changeFontSize(fontSize - 2)
							}}
							name='dash'
							size='medium'
							color={ThemeColor(colorScheme.theme.p.color)}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Icon
							name='plus'
							style={{
								borderColor: ThemeColor(
									colorScheme.theme[fontSize === 26 ? 'h1' : 'p'].color
								)
							}}
							onPress={() => {
								changeFontSize(fontSize + 2)
							}}
							className='w-[60px] rounded-l-none p-1'
							color={ThemeColor(colorScheme.theme.p.color)}
							size='medium'
						/>
					</TouchableOpacity>
				</View>
			</View>

			<View className='mt-6 flex-row items-center justify-center'>
				<View className='mr-4 flex-row items-center'>
					<LineHeightIcon
						lineCount={3}
						onPress={() => changeLineHeight(1.8)}
						backgroundColor={ThemeColor(
							colorScheme.theme[lineHeight === 1.8 ? 'h1' : 'p'].color
						)}
					/>
					<LineHeightIcon
						lineCount={4}
						className='mx-3'
						onPress={() => changeLineHeight(1.5)}
						backgroundColor={ThemeColor(
							colorScheme.theme[lineHeight === 1.5 ? 'h1' : 'p'].color
						)}
					/>
					<LineHeightIcon
						lineCount={5}
						onPress={() => changeLineHeight(1.3)}
						backgroundColor={ThemeColor(
							colorScheme.theme[lineHeight === 1.3 ? 'h1' : 'p'].color
						)}
					/>
				</View>

				<View className='ml-4 flex-row items-center'>
					<PageMarginIcon
						className='p-1  pb-0.5'
						onPress={() => changePadding(8)}
						backgroundColor={ThemeColor(
							colorScheme.theme[padding === 8 ? 'h1' : 'p'].color
						)}
					/>
					<PageMarginIcon
						className='mx-3 p-1.5  pb-0.5'
						onPress={() => changePadding(14)}
						backgroundColor={ThemeColor(
							colorScheme.theme[padding === 14 ? 'h1' : 'p'].color
						)}
					/>
					<PageMarginIcon
						className='p-2 pb-0.5'
						onPress={() => changePadding(20)}
						backgroundColor={ThemeColor(
							colorScheme.theme[padding === 20 ? 'h1' : 'p'].color
						)}
					/>
				</View>
			</View>
		</View>
	)
}

export default FontSettings
