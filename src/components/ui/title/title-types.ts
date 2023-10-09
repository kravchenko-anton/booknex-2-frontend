import { fontSettings } from '@/components/ui/title/title-settings'
import type { TextDefaultProperties } from '@/types/component-types'
import type { ColorProperties } from '@/utils/color'

export type TitleProperties = TextDefaultProperties &
	ColorProperties & {
		center?: boolean
		size?: number
		children: string | number | undefined
		weight?: keyof typeof fontSettings
	}
