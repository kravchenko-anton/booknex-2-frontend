import { usePressAnimation } from '@/components/ui/button/button-animation'
import { BackgroundColor, Padding, TextColor, TextSize, TextWeight } from '@/components/ui/button/button-settings'
import { IButtonTypes } from '@/components/ui/button/button-types'
import { Title } from '@/components/ui/title/title'
import { AnimatedPressable } from '@/types/component.types'
import { FC } from 'react'

const Button: FC<IButtonTypes> =
	({	size = 'large',
	 variant = 'primary',
	 borderRadius = 10,
	 iconSize = 20,
	 style,
		icon,
	 ...props}) => {
	const {pressFunctions,animatedStyle} = usePressAnimation()
	return <AnimatedPressable
		style={[{
		backgroundColor:  BackgroundColor[variant],
		borderRadius: borderRadius,
		padding: Padding[size],
		alignItems: 'center',
	}, animatedStyle, style]} {...pressFunctions} {...props}>
		<Title color={TextColor[variant]}
		       weight={TextWeight[size]} size={TextSize[size]}>
			{props.text}
		</Title>
	</AnimatedPressable>
}

export default Button
