import { usePressAnimation } from '@/animations/press-animation'
import {
	BackgroundColorSetting,
	BorderColorSetting,
	IconColorSetting,
	SizeSetting
} from '@/components/ui/icon/icon-settings'
import { IconProps } from '@/components/ui/icon/icon-types'
import { BorderRadiusSetting, PaddingSetting } from '@/components/ui/settings'
import { AnimatedPressable } from '@/types/component-types'
import { Ionicons } from '@expo/vector-icons'
import { FC } from 'react'

const Icon: FC<IconProps> = ({
	name = 'alert-outline',
	variant = 'ghost',
	size = 'small',
	style,
	...props
}) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			className='items-center justify-center border-[1px]'
			style={[
				{
					padding: PaddingSetting[size],
					backgroundColor: BackgroundColorSetting[variant],
					borderRadius: BorderRadiusSetting,
					borderColor: BorderColorSetting[variant]
				},
				animatedStyle,
				style
			]}
			{...pressFunctions}
			{...props}>
			<Ionicons
				name={name}
				size={SizeSetting[size]}
				color={IconColorSetting[variant]}
			/>
		</AnimatedPressable>
	)
}

export default Icon
