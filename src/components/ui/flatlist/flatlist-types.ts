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
		| 'scrollEnabled'
		| 'numColumns'
		| 'contentContainerStyle'
		| 'columnWrapperStyle'
	> {
	data: T[]
	elementSpacing?: number
	renderItem: ListRenderItem<T>
	headerText?: string
	mt?: number
	px?: number
	titleMb?: number
}
