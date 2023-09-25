import { ScrollViewProps } from '@/components/ui/scroll-view/scroll-view-types'
import { FC } from 'react'
import { ScrollView as DefaultScrollView } from 'react-native'

const ScrollView: FC<ScrollViewProps> = ({ ...props }) => {
	return (
		<DefaultScrollView
			automaticallyAdjustContentInsets={false}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			renderToHardwareTextureAndroid={true}
			removeClippedSubviews={true}
			alwaysBounceHorizontal={false}
			alwaysBounceVertical={false}
			bounces={false}
			bouncesZoom={false}
			decelerationRate={'normal'}
			{...props}>
			{props.children}
		</DefaultScrollView>
	)
}

export default ScrollView
