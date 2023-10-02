import type {
	FlatListProps as FlatListDefaultProperties,
	ListRenderItem
} from 'react-native'

export interface FlatListProperties<T>
	extends Pick<
		FlatListDefaultProperties<T>,
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
	data: T[] | undefined
	elementSpacing?: number
	renderItem: ListRenderItem<T>
	headerText?: string
	mt?: number
	px?: number
	titleMb?: number
}
