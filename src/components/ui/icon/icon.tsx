import { usePressAnimation } from '@/animations/press-animation'
import {
	BorderRadiusSetting,
	PaddingSetting
} from '@/components/ui/global-settings'
import {
	BackgroundColorSetting,
	BorderColorSetting,
	IconColorSetting,
	SizeSetting
} from '@/components/ui/icon/icon-settings'
import type { IconProps } from '@/components/ui/icon/icon-types'
import { AnimatedPressable } from '@/types/component-types'
import { Octicons } from '@expo/vector-icons'
import type { FC } from 'react'
import { memo } from 'react'

const Icon: FC<IconProps> = ({
	name = 'alert',
	variant = 'ghost',
	size = 'small',
	color,
	style,
	noPadding = false,
	...props
}) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			className='items-center justify-center border-[1px]'
			style={[
				{
					padding: noPadding ? 0 : PaddingSetting[size],
					backgroundColor: BackgroundColorSetting[variant],
					borderRadius: BorderRadiusSetting,
					borderColor: BorderColorSetting[variant]
				},
				animatedStyle,
				style
			]}
			{...pressFunctions}
			{...props}>
			<Octicons
				name={name}
				size={SizeSetting[size]}
				color={color ? color : IconColorSetting[variant]}
			/>
		</AnimatedPressable>
	)
}

export default memo(Icon)
