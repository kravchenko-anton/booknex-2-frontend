import { fontSettings } from '@/components/ui/title/title-settings'
import { TextDefaultProperties } from '@/types/component-types'
import { ColorProperties } from '@/utils/color'

export type DescriptionProperties = Omit<
	TextDefaultProperties,
	'numberOfLines'
> &
	ColorProperties & {
		children: string | number | undefined
		center?: boolean
		size?: number
		defaultSentences?: number
		weight?: keyof typeof fontSettings
	}
