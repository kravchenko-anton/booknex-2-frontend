import { weightSettings } from '@/components/ui/title/title-settings'
import type { TextDefaultProps } from '@/types/component-types'
import type { ColorProps } from '@/utils/color'

export type TitleProps = TextDefaultProps &
	ColorProps & {
		center?: boolean
		size?: number
		children: string | string[] | any
		weight?: keyof typeof weightSettings
	}
