import { BackgroundColor, Padding, TextColor, TextWeight } from '@/components/ui/button/button-settings'
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
	return <AnimatedPressable
		style={[{
		backgroundColor:  BackgroundColor[variant],
		borderRadius: borderRadius,
		padding: Padding[size],
		alignItems: 'center',
	}, style]} {...props}>
		<Title color={TextColor[variant]}
		       weight={
			TextWeight[size]
		}>
			{props.text}
		</Title>
	</AnimatedPressable>
}

export default Button
