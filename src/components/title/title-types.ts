import { weightSettings } from '@/components/title/title-settings'
import { UTextProps } from '@/types/component.types'
import { ColorProps } from '@/utils/color'

export type TitleProps = UTextProps &
	ColorProps & {
	center?: boolean
	size?: number
	children: string
	weight?: keyof typeof weightSettings
}
