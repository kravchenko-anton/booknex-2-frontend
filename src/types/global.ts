import type { ViewDefaultProperties } from '@/types/component-types'
import { Octicons } from '@expo/vector-icons'
import { Dispatch, SetStateAction } from 'react'
import { WithSpringConfig, WithTimingConfig } from 'react-native-reanimated'

export type IconType = keyof typeof Octicons.glyphMap

export interface AnimationConfigType {
	userConfig?: WithSpringConfig | WithTimingConfig
}

export interface WrapperProperties<T> {
	wrapperStyle?: T
	wrapperClassName?: string
}

export interface Dimensions {
	width: number
	height: number
}
export type Style = ViewDefaultProperties['style']

export interface DefaultModelFields {
	id: number
	createdAt: string
	updatedAt: string
}

export interface PopupTypes<T> {
	isActivePopup: boolean
	setIsActivePopup: Dispatch<SetStateAction<T>>
}
