import { usePressAnimation } from '@/animations/press-animation'
import {
	BackgroundColor,
	TextColor,
	TextSize,
	TextWeight
} from '@/components/ui/button/button-settings'
import { ButtonProps } from '@/components/ui/button/button-types'
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
	...props
}: ButtonProps) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			style={[
				{
					marginBottom: 4,
					opacity: props.disabled ? 0.7 : 1,
					backgroundColor: BackgroundColor[variant],
					borderRadius: BorderRadiusSetting,
					padding: PaddingSetting[size],
					alignItems: 'center',
					justifyContent: 'center'
				},
				animatedStyle,
				style
			]}
			{...pressFunctions}
			{...props}>
			<Title
				color={TextColor[variant]}
				weight={TextWeight[size]}
				size={TextSize[size]}>
				{props.text}
			</Title>
		</AnimatedPressable>
	)
}

export default memo(Button)
