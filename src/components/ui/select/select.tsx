import PressableContainer from '@/components/pressable-container/pressable-container'
import Icon from '@/components/ui/icon/icon'
import ScrollView from '@/components/ui/scroll-view/scroll-view'
import { Title } from '@/components/ui/title/title'
import OutsidePressHandler from '@/hooks/outside-press/components/outside-press-handler'
import type { ViewDefaultProperties } from '@/types/component-types'
import type { LineColorType } from '@/utils/color'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'

interface SelectProperties extends ViewDefaultProperties {
	onSelect: (value: { value: string; label: string }) => void
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
	const [active, setActive] = useState(false)
	const popupAnimation = useAnimatedStyle(() => {
		return {
			opacity: withTiming(active ? 1 : 0),
			display: active ? 'flex' : 'none'
		}
	})
	return (
		<>
			<PressableContainer
				onPress={() => setActive(!active)}
				className='relative h-full flex-row items-center rounded-xl p-2 px-3'
				style={{
					backgroundColor: properties.backgroundColor || 'transparent'
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
			<OutsidePressHandler
				onOutsidePress={() => {
					setActive(active)
				}}
				disabled={!active}
				style={[
					popupAnimation,
					{
						backgroundColor: properties.backgroundColor || 'transparent'
					}
				]}
				className='absolute left-0 top-0 z-50 mt-1 max-h-[300px] rounded-lg'>
				<ScrollView>
					{properties.elements.map(element => {
						return (
							<Pressable
								onPress={() => {
									properties.onSelect(element)
									setActive(!active)
								}}
								key={`${element.value}-${element.label}`}
								className='flex-row items-center justify-between p-2 '>
								<Title
									weight={'bold'}
									color={(properties.color || Color.white) as LineColorType}>
									{element.label}
								</Title>
							</Pressable>
						)
					})}
				</ScrollView>
			</OutsidePressHandler>
		</>
	)
}

export default Select
