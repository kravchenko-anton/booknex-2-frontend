import { ScrollViewDefaultProperties } from '@/types/component-types'
import type { FC } from 'react'
import { ScrollView as DefaultScrollView } from 'react-native'

const ScrollView: FC<ScrollViewDefaultProperties> = ({ ...properties }) => {
	return (
		<DefaultScrollView
			automaticallyAdjustContentInsets={false}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			renderToHardwareTextureAndroid={true}
			alwaysBounceHorizontal={false}
			alwaysBounceVertical={false}
			bounces={false}
			bouncesZoom={false}
			decelerationRate={'normal'}
			{...properties}>
			{properties.children}
		</DefaultScrollView>
	)
}

export default ScrollView
