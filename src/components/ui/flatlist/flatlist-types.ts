import type { LineColorType } from '@/utils/color'
import type {
	FlatListProps as FlatListDefaultProperties,
	ListRenderItem
} from 'react-native'

export interface FlatListProperties<T>
	extends Pick<
		FlatListDefaultProperties<T>,
		| 'horizontal'
		| 'onEndReached'
		| 'onLayout'
		| 'ListHeaderComponent'
		| 'ListEmptyComponent'
		| 'keyExtractor'
		| 'style'
		| 'data'
		| 'className'
		| 'snapToInterval'
		| 'snapToAlignment'
		| 'extraData'
		| 'inverted'
		| 'scrollEnabled'
		| 'numColumns'
		| 'contentContainerStyle'
		| 'columnWrapperStyle'
	> {
	data: T[] | undefined
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
