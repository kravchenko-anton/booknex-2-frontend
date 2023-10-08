import { HeaderProperties } from '@/components/header/header-types'
import Icon from '@/components/ui/icon/icon'
import { IconProperties } from '@/components/ui/icon/icon-types'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

export const useHeader = (
	properties: Omit<HeaderProperties, 'style' | 'className'>
) => {
	const { goBack } = useTypedNavigation()
	const leftIconSettings = {
		back: (
			<Icon
				name={'arrow-left'}
				onPress={() => {
					goBack()
				}}
				size={'large'}
				color={properties.color}
				className='pl-0'
			/>
		),
		icon: properties.leftIcon ? (
			<Icon
				size={'large'}
				className='pl-0'
				color={properties.color}
				{...(properties.leftIcon as Omit<IconProperties, 'color' | 'size'>)}
			/>
		) : null,
		element: properties.leftIcon as JSX.Element
	}

	const rightIconSettings = {
		icon: properties.rightIcon && (
			<Icon
				size={'large'}
				className='pr-0'
				color={properties.color}
				{...(properties.rightIcon as Omit<IconProperties, 'color' | 'size'>)}
			/>
		),
		element: properties.rightIcon as JSX.Element
	}

	return {
		leftIconSettings,
		rightIconSettings
	}
}
