import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { FeatureProperties } from '@/screens/book/feature/feature-types'
import type { FC } from 'react'
import { View } from 'react-native'

const Feature: FC<FeatureProperties> = ({
	iconName = 'book',
	iconTitle,
	iconDescription
}) => {
	return (
		<View className='flex-row items-center'>
			<Icon name={iconName} size={'large'} className='pl-0' />
			<View>
				<Title size={22} weight={'bold'}>
					{iconTitle}
				</Title>
				<Title size={15} weight={'regular'}>
					{iconDescription}
				</Title>
			</View>
		</View>
	)
}

export default Feature
