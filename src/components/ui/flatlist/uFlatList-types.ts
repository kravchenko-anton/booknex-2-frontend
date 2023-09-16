import { ViewDefaultProps } from '@/types/component-types'
import { WrapperProps } from '@/types/global'
import {
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
}
