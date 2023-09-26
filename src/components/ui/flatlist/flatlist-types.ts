import type { ViewDefaultProps } from '@/types/component-types'
import type { WrapperProps } from '@/types/global'
import type {
	FlatListProps as FlatListDefaultProps,
	ListRenderItem
} from 'react-native'

export interface FlatListProps<T>
	extends Pick<
			FlatListDefaultProps<T>,
			| 'horizontal'
			| 'ListEmptyComponent'
			| 'keyExtractor'
			| 'style'
			| 'data'
			| 'className'
			| 'snapToInterval'
			| 'snapToAlignment'
			| 'extraData'
			| 'inverted'
			| 'initialNumToRender'
			| 'maxToRenderPerBatch'
			| 'scrollEnabled'
			| 'numColumns'
			| 'contentContainerStyle'
			| 'columnWrapperStyle'
		>,
		WrapperProps<ViewDefaultProps> {
	data: T[]
	elementSpacing?: number
	renderItem: ListRenderItem<T>
	headerText?: string
	mt?: number
	px?: number
	titleMb?: number
}
