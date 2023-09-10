import { weightSettings } from '@/components/ui/title/title-settings'
import { TitleProps } from '@/components/ui/title/title-types'
import { Color } from '@/utils/color'
import { Text } from 'react-native'

export const Title =
	({
	children,
	numberOfLines = 1,
	weight = 'light',
	size = 20,
	center = false,
	style,
	...props
}: TitleProps) => {
	return <Text
		style={[
			{
				fontFamily: weightSettings[weight],
				fontSize: size,
				textAlign: center ? 'center' : 'left',
				color: props.color ? props.color : Color.black
			},
			style
		]}
		numberOfLines={numberOfLines}
		{...props}>
		{children}
	</Text>
}
