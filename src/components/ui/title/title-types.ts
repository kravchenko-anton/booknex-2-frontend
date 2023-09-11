import { weightSettings } from '@/components/ui/title/title-settings'
import { UTextProps } from '@/types/component-types'
import { ColorProps } from '@/utils/color'

export type TitleProps = UTextProps &
	ColorProps & {
		center?: boolean
		size?: number
		children: string | string[] | any
		weight?: keyof typeof weightSettings
	}
