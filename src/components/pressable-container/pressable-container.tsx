import { usePressAnimation } from '@/animations/press-animation'
import { AnimatedPressable } from '@/types/component-types'

const PressableContainer = () => {
	// TODO: сделать один компонент провайдер для анимации наажатия и использовать его везде
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return <AnimatedPressable></AnimatedPressable>
}

export default PressableContainer
