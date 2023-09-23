import {
	ImageProps,
	Pressable,
	PressableProps,
	ScrollViewProps,
	TextProps,
	View,
	ViewProps
} from 'react-native'
import Animated from 'react-native-reanimated'

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
export const AnimatedView = Animated.createAnimatedComponent(View)

export type ViewDefaultProps = Pick<
	ViewProps,
	'className' | 'style' | 'onLayout' | 'pointerEvents' | 'onMagicTap'
>

export type PressableDefaultProps = Pick<
	PressableProps,
	| 'onLayout'
	| 'pointerEvents'
	| 'onPress'
	| 'disabled'
	| 'onBlur'
	| 'onFocus'
	| 'onMagicTap'
	| 'style'
	| 'className'
	| 'onLongPress'
>

export type TextDefaultProps = Pick<
	TextProps,
	| 'style'
	| 'onPress'
	| 'className'
	| 'onMagicTap'
	| 'onTextLayout'
	| 'onLayout'
	| 'disabled'
	| 'onLongPress'
	| 'numberOfLines'
>

export type ImageDefaultProps = Pick<
	ImageProps,
	| 'blurRadius'
	| 'onLoad'
	| 'resizeMode'
	| 'resizeMethod'
	| 'progressiveRenderingEnabled'
	| 'onProgress'
	| 'borderRadius'
	| 'fadeDuration'
	| 'defaultSource'
	| 'style'
	| 'className'
	| 'onError'
>

export type ScrollViewDefaultProps = Pick<
	ScrollViewProps,
	| 'scrollEnabled'
	| 'keyboardDismissMode'
	| 'refreshControl'
	| 'onScrollAnimationEnd'
	| 'onScroll'
	| 'scrollToOverflowEnabled'
	| 'renderToHardwareTextureAndroid'
	| 'contentContainerStyle'
	| 'style'
	| 'horizontal'
	| 'decelerationRate'
	| 'pointerEvents'
	| 'className'
	| 'showsVerticalScrollIndicator'
	| 'showsHorizontalScrollIndicator'
	| 'onScrollBeginDrag'
	| 'onLayout'
	| 'onContentSizeChange'
	| 'onMomentumScrollEnd'
	| 'onMomentumScrollBegin'
	| 'onScrollEndDrag'
	| 'onScrollToTop'
	| 'onTouchEnd'
	| 'onTouchMove'
	| 'onTouchStart'
>
