import { usePressAnimation } from '@/animations/press-animation'
import {
	BackgroundColor,
	TextColor,
	TextSize,
	TextWeight
} from '@/components/ui/button/button-settings'
import { ButtonProperties } from '@/components/ui/button/button-types'
import {
	BorderRadiusSetting,
	PaddingSetting
} from '@/components/ui/global-settings'
import { Title } from '@/components/ui/title/title'
import { AnimatedPressable } from '@/types/component-types'
import { memo } from 'react'

const Button = ({
	size = 'large',
	variant = 'primary',
	style,
	...properties
}: ButtonProperties) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			className='mb-2 items-center justify-center'
			style={[
				{
					opacity: properties.disabled ? 0.7 : 1,
					backgroundColor: BackgroundColor[variant],
					borderRadius: BorderRadiusSetting,
					padding: PaddingSetting[size]
				},
				animatedStyle,
				style
			]}
			{...pressFunctions}
			{...properties}>
			<Title
				color={TextColor[variant]}
				weight={TextWeight[size]}
				size={TextSize[size]}>
				{properties.text}
			</Title>
		</AnimatedPressable>
	)
}

export default memo(Button)
