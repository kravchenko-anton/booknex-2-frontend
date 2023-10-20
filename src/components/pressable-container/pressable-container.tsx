import { usePressAnimation } from '@/animations/press-animation'
import {
	AnimatedPressable,
	PressableDefaultProperties
} from '@/types/component-types'
import { FC, PropsWithChildren, memo } from 'react'

const PressableContainer: FC<PropsWithChildren<PressableDefaultProperties>> = ({
	children,
	style,
	...properties
}) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			{...pressFunctions}
			// TODO: возможно плохое решение
			className='mb-2'
			style={[style, animatedStyle]}
			{...properties}>
			{children}
		</AnimatedPressable>
	)
}

export default memo(PressableContainer)
