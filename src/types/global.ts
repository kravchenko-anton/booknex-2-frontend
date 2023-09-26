import type { ViewDefaultProps } from '@/types/component-types'
import { Octicons } from '@expo/vector-icons'
import { Dispatch, SetStateAction } from 'react'
import { WithSpringConfig, WithTimingConfig } from 'react-native-reanimated'

export type IconType = keyof typeof Octicons.glyphMap
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

export interface PopupTypes<T> {
	isActivePopup: boolean
	setIsActivePopup: Dispatch<SetStateAction<T>>
}
