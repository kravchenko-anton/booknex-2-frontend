import { DescriptionProperties } from '@/components/ui/description/description-types'
import { fontSettings } from '@/components/ui/title/title-settings'
import { memo, useState } from 'react'
import { Text, View } from 'react-native'

export const Description = memo(
	({
		children,
		weight = 'light',
		size = 20,
		defaultSentences = 3,
		center = false,
		style,
		...properties
	}: DescriptionProperties) => {
		const [expanded, setExpanded] = useState(false)
		if (!children && children !== 0) return null
		const textStyle = {
			fontFamily: fontSettings[weight],
			fontSize: size,
			textAlign: center ? 'center' : ('left' as 'center' | 'left')
		}

		const shortenText = (text: string) => {
			const sentences =
				text
					.replaceAll('...', '')
					.split('.')
					.slice(0, defaultSentences)
					.join('.') + '.'
			return expanded ? text : sentences
		}

		const originalText = children.toString()
		const shortenedText = shortenText(originalText)
		return (
			<View style={style}>
				<Text style={textStyle} {...properties}>
					{shortenedText}
				</Text>
				{!expanded && originalText.length > shortenedText.length && (
					<Text
						style={textStyle}
						onPress={() => {
							setExpanded(!expanded)
						}}
						className='text-primary underline'>
						more
					</Text>
				)}
			</View>
		)
	}
)

export default Description
