import Button from '@/components/ui/button/button'
import { TabsProps } from '@/components/ui/tabs/tabs-types'
import { WINDOW_WIDTH } from '@/constants/dimensions'
import { FC, memo, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'

const Tabs: FC<TabsProps> = ({ routes, ...props }) => {
	const [activeTab, setActiveTab] = useState(routes[0].key)
	let flatListRef = useRef<FlatList>(null)
	let tabListRef = useRef<FlatList>(null)
	return (
		<View {...props}>
			<View>
				<FlatList
					ref={tabListRef}
					renderToHardwareTextureAndroid={true}
					horizontal={true}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					bounces={false}
					ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
					data={routes}
					renderItem={({ item: book }) => {
						return (
							<Button
								size={'medium'}
								onPress={() => {
									const index = routes.findIndex(
										route => route.key === book.key
									)
									tabListRef.current?.scrollToIndex({ index })
									flatListRef.current?.scrollToIndex({ index })
								}}
								variant={activeTab === book.key ? 'primary' : 'dust'}
								text={book.title}
							/>
						)
					}}
				/>
			</View>
			<FlatList
				horizontal={true}
				bounces={false}
				showsVerticalScrollIndicator={false}
				pagingEnabled={true}
				ref={flatListRef}
				onScroll={e => {
					const index = Math.round(e.nativeEvent.contentOffset.x / WINDOW_WIDTH)
					tabListRef.current?.scrollToIndex({ index })
					setActiveTab(routes[index].key)
				}}
				snapToInterval={WINDOW_WIDTH}
				showsHorizontalScrollIndicator={false}
				renderToHardwareTextureAndroid={true}
				data={routes}
				renderItem={({ item }) => {
					return (
						<View
							style={{
								maxWidth: WINDOW_WIDTH,
								width: WINDOW_WIDTH
							}}>
							{item.component}
						</View>
					)
				}}
			/>
		</View>
	)
}

export default memo(Tabs)
