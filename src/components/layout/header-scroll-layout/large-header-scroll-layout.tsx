import AnimatedHeader from '@/components/header/animated-header/animated-header'
import Header from '@/components/header/header'
import { LargeHeaderScrollLayoutProperties } from '@/components/layout/header-scroll-layout/header-scroll-layout-types'
import ScrollLayout from '@/components/layout/scroll-layout'
import { Title } from '@/components/ui/title/title'
import { getFileUrl } from '@/services/api-config'
import { Color } from '@/utils/color'
import { FC, PropsWithChildren } from 'react'
import { ImageBackground, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

const LargeHeaderScrollLayout: FC<
	PropsWithChildren<LargeHeaderScrollLayoutProperties>
> = ({ children, ...properties }) => {
	const scrollPosition = useSharedValue(0)
	return (
		<>
			<AnimatedHeader
				scrollPosition={scrollPosition}
				{...properties.animatedHeader}
			/>
			<ScrollLayout
				onLayout={() => {
					scrollPosition.value = 0
				}}
				onScroll={event => {
					scrollPosition.value = event.nativeEvent.contentOffset.y
				}}>
				{properties.type === 'background' ? (
					<View
						style={{
							backgroundColor: properties.background
						}}
						className='h-[230px] p-4 pt-0'>
						<Header color={Color.white} {...properties.header} />
						<Title
							size={26}
							color={Color.white}
							weight={'bold'}
							numberOfLines={2}>
							{properties.title}
						</Title>
						<Title
							size={18}
							className='mt-2 w-1/2'
							weight={'bold'}
							color={Color.dust}>
							{properties.description}
						</Title>
					</View>
				) : (
					<ImageBackground
						source={{ uri: getFileUrl(properties.background) }}
						className='h-[250px]'>
						<View className='flex-1 bg-[#0000009a] p-4 pt-0'>
							<Header color={Color.white} {...properties.header} />
							<Title
								size={26}
								color={Color.white}
								center={true}
								weight={'bold'}
								numberOfLines={2}>
								{properties.title}
							</Title>
						</View>
					</ImageBackground>
				)}
				{children}
			</ScrollLayout>
		</>
	)
}

export default LargeHeaderScrollLayout
