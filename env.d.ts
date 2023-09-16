declare module '@env' {
	export const SERVER_URL: string
	export const STORAGE_URL: string
}
//TODO: code for redations
// 		<FlatList
// 				data={editions}
// 				horizontal
// 				bounces={false}
// 				className='px-2'
// 				showsHorizontalScrollIndicator={false}
// 				renderItem={({ item }) => {
// 					return (
// 						<View
// 							style={{ backgroundColor: item.color }}
// 							className='mr-2 h-full w-[135px] rounded-2xl border-2 border-primary'>
// 							<View className='h-full w-full flex-1 rounded-2xl border-2 border-white  p-4'>
// 								<Icon
// 									name={item.icon}
// 									size={'large'}
// 									color={Color.white}
// 									className='mb-2 items-start p-0'
// 								/>
// 								<Title
// 									weight={'regular'}
// 									size={15}
// 									numberOfLines={3}
// 									className='mt-auto text-black'>
// 									{item.title}
// 								</Title>
// 							</View>
// 						</View>
// 					)
// 				}}
// 			/>
