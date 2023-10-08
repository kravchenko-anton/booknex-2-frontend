import AnimatedHeader from '@/components/header/animated-header/animated-header'
import Header from '@/components/header/header'
import { HeaderScrollLayoutProperties } from '@/components/layout/header-scroll-layout/header-scroll-layout-types'
import ScrollLayout from '@/components/layout/scroll-layout'
import { FC, PropsWithChildren } from 'react'
import { useSharedValue } from 'react-native-reanimated'

const HeaderScrollLayout: FC<
	PropsWithChildren<HeaderScrollLayoutProperties>
> = ({ header, animatedHeader, children }) => {
	const scrollPosition = useSharedValue(0)
	return (
		<>
			<AnimatedHeader scrollPosition={scrollPosition} {...animatedHeader} />
			<ScrollLayout
				onLayout={() => {
					scrollPosition.value = 0
				}}
				onScroll={event => {
					scrollPosition.value = event.nativeEvent.contentOffset.y
				}}>
				<Header className='px-2' {...header} />
				{children}
			</ScrollLayout>
		</>
	)
}

export default HeaderScrollLayout
