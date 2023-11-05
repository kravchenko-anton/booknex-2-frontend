import PressableContainer from '@/components/pressable-container/pressable-container'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { ThemeColor } from '@/screens/reading/settings/sheet/reading/theme-pack'
import type { ViewDefaultProperties } from '@/types/component-types'
import { AnimatedScrollView } from '@/types/component-types'
import type { LineColorType } from '@/utils/color'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { Pressable } from 'react-native'
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated'

interface SelectProperties extends ViewDefaultProperties {
	onSelect: (value: string) => void
	activeTitle: string
	elements: {
		value: string
		label: string
	}[]
	backgroundColor?: string
	color?: string
	fullSize?: boolean
}
const Select: FC<SelectProperties> = ({ ...properties }) => {
	const active = useSharedValue(false)
	const popupAnimation = useAnimatedStyle(() => {
		return {
			opacity: withTiming(active.value ? 1 : 0),
			display: active.value ? 'flex' : 'none'
		}
	})
	return (
		<>
			<PressableContainer
				onPress={() => (active.value = !active.value)}
				className='h-full flex-row items-center rounded-xl p-2 px-3'
				style={{
					backgroundColor: ThemeColor(
						properties.backgroundColor || 'transparent'
					)
				}}>
				<Title
					weight={'bold'}
					color={(properties.color || Color.white) as LineColorType}>
					{properties.activeTitle}
				</Title>
				<Icon
					pointerEvents={'none'}
					noPadding
					className='ml-2 h-6 w-6'
					name={'chevron-down'}
					size='medium'
					color={(properties.color || Color.white) as LineColorType}
				/>
			</PressableContainer>
			{
				// TODO: сделать useOutsideClick
			}
			<AnimatedScrollView
				style={popupAnimation}
				className='absolute left-0 z-50 mt-1 rounded-xl bg-gray'>
				{properties.elements.map(element => {
					return (
						<Pressable
							onPress={() => {
								properties.onSelect(element.value)
								active.value = false
							}}
							key={`${element.value}-${element.label}`}
							className='flex-row items-center justify-between p-2'
							style={{
								backgroundColor: ThemeColor(
									properties.backgroundColor || 'transparent'
								)
							}}>
							<Title
								weight={'bold'}
								color={(properties.color || Color.white) as LineColorType}>
								{element.label}
							</Title>
						</Pressable>
					)
				})}
			</AnimatedScrollView>
		</>
	)
}

export default Select
