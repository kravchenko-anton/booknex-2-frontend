import type { PressableDefaultProperties } from '@/types/component-types'

export interface AuthorCardProperties extends PressableDefaultProperties {
	picture: string
	name: string
	size?: 'small' | 'medium' | 'large'
}
