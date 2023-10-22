import type {
	FlatListProps as FlatListDefaultProperties,
	ListRenderItem
} from 'react-native'

export interface FlatListProperties<T>
	extends Pick<
		FlatListDefaultProperties<T>,
		| 'horizontal'
		| 'onEndReached'
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
	headerText?: string
	mt?: number
	px?: number
	renderItem: ListRenderItem<T> | null
	titleMb?: number
}
