import AnimatedHeader from '@/components/header/animated-header/animated-header'
import { LargeHeaderScrollLayoutProperties } from '@/components/layout/header-scroll-layout/header-scroll-layout-types'
import ScrollLayout from '@/components/layout/scroll-layout'
import { FC, PropsWithChildren } from 'react'
import { useSharedValue } from 'react-native-reanimated'

const LargeHeaderScrollLayout: FC<
	PropsWithChildren<LargeHeaderScrollLayoutProperties>
> = ({ children, headerChildren, ...properties }) => {
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
				{headerChildren}
				{children}
			</ScrollLayout>
		</>
	)
}

export default LargeHeaderScrollLayout
