import type { FlatlistDefaultProperties } from '@/types/component-types'
import type { LineColorType } from '@/utils/color'
import type { RefObject } from 'react'
import type { FlatList, ListRenderItem } from 'react-native'

export interface FlatListProperties<T> extends FlatlistDefaultProperties<T> {
	data: T[] | undefined
	Ref?: RefObject<FlatList<T>>
	elementSpacing?: number
	title?: {
		text: string
		color?: LineColorType
		mb?: number
	}
	mt?: number
	px?: number
	renderItem: ListRenderItem<T> | null
}
