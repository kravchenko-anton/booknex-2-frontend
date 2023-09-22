import { usePressAnimation } from '@/animations/press-animation'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { AnimatedPressable } from '@/types/component-types'
import { Color } from '@/utils/color'

const SearchField = () => {
	const { navigate } = useTypedNavigation()
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			onPress={() => navigate('Search')}
			className='mx-2 flex-row items-center justify-between rounded-xl border-2 border-secondary bg-dust px-3 py-2'
			style={[animatedStyle]}
			{...pressFunctions}>
			<Title weight={'bold'} size={24} color={Color.black}>
				Search
			</Title>
			<Icon name={'search'} size={'medium'} noPadding />
		</AnimatedPressable>
	)
}

export default SearchField
