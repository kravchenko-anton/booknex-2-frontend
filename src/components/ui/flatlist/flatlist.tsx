import { FlatListProps } from '@/components/ui/flatlist/uFlatList-types'
import { Title } from '@/components/ui/title/title'
import { FlatList as DefaultFlatlist, View } from 'react-native'

const FlatList = <T,>({
	headerText,
	wrapperClassName,
	maxToRenderPerBatch,
	initialNumToRender,
	wrapperStyle,
	elementSpacing = 12,
	contentContainerStyle,
	mt = 24,
	...props
}: FlatListProps<T>) => {
	if (props.data.length === 0 && !props.ListEmptyComponent) return null
	return (
		<View
			className={wrapperClassName}
			style={[{ marginTop: mt }, wrapperStyle]}>
			{headerText && props.data.length !== 0 && (
				<Title
					className='mb-5'
					style={{ paddingHorizontal: props.horizontal ? 8 : 0 }}
					size={22}
					weight='semiBold'>
					{headerText}
				</Title>
			)}
			<DefaultFlatlist
				ItemSeparatorComponent={() => (
					<View
						style={
							props.horizontal
								? { width: elementSpacing }
								: { height: elementSpacing }
						}
					/>
				)}
				contentContainerStyle={{ paddingHorizontal: props.horizontal ? 8 : 0 }}
				bounces={false}
				renderToHardwareTextureAndroid={true}
				removeClippedSubviews={true}
				alwaysBounceHorizontal={false}
				maxToRenderPerBatch={maxToRenderPerBatch || 10}
				initialNumToRender={initialNumToRender || 10}
				alwaysBounceVertical={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				decelerationRate='normal'
				{...props}
			/>
		</View>
	)
}

export default FlatList