import { FlatListProperties } from '@/components/ui/flatlist/flatlist-types'
import { Title } from '@/components/ui/title/title'
import { FlatList as DefaultFlatlist, View } from 'react-native'

const FlatList = <T,>({
	headerText,
	data = [],
	elementSpacing = 12,
	titleMb = 16,
	contentContainerStyle,
	mt = 24,
	px = 8,
	style,
	...properties
}: FlatListProperties<T>) => {
	if (data.length === 0 && !properties.ListEmptyComponent) return
	return (
		<>
			{headerText && data.length > 0 && (
				<Title
					style={{
						marginTop: mt,
						paddingHorizontal: properties.horizontal ? px : 0,
						marginBottom: titleMb
					}}
					size={22}
					weight='semiBold'>
					{headerText}
				</Title>
			)}
			<DefaultFlatlist
				data={data}
				style={headerText ? style : [{ marginTop: mt }, style]}
				ItemSeparatorComponent={() => (
					<View
						style={
							properties.horizontal
								? { width: elementSpacing }
								: { height: elementSpacing }
						}
					/>
				)}
				contentContainerStyle={{
					paddingHorizontal: properties.horizontal ? px : 0
				}}
				bounces={false}
				renderToHardwareTextureAndroid={true}
				removeClippedSubviews={true}
				alwaysBounceHorizontal={false}
				maxToRenderPerBatch={10}
				initialNumToRender={10}
				alwaysBounceVertical={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				decelerationRate='normal'
				{...properties}
			/>
		</>
	)
}

export default FlatList
