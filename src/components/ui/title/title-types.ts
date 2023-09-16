import { weightSettings } from '@/components/ui/title/title-settings'
import { TextDefaultProps } from '@/types/component-types'
import { ColorProps } from '@/utils/color'

export type TitleProps = TextDefaultProps &
	ColorProps & {
		center?: boolean
		size?: number
		children: string | string[] | any
		weight?: keyof typeof weightSettings
	}
