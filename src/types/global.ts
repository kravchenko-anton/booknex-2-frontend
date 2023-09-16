import { ViewDefaultProps } from '@/types/component-types'
import { Ionicons } from '@expo/vector-icons'
import { WithSpringConfig, WithTimingConfig } from 'react-native-reanimated'

export type IconType = keyof typeof Ionicons.glyphMap
export interface AnimationConfigType {
	userConfig?: WithSpringConfig | WithTimingConfig
}

export interface WrapperProps<T> {
	wrapperStyle?: T
	wrapperClassName?: string
}
export type Width_Height = { width: number; height: number }
export type Style = ViewDefaultProps['style']
export interface DefaultModelFields {
	id: number
	createdAt: string
	updatedAt: string
}
