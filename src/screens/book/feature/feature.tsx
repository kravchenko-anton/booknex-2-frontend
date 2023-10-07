import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { FeatureProperties } from '@/screens/book/feature/feature-types'
import type { FC } from 'react'
import { View } from 'react-native'

const Feature: FC<FeatureProperties> = ({
	icon = 'alert',
	count,
	description
}) => {
	return (
		<View className='flex-row items-center'>
			<Icon name={icon} size={'large'} className='pl-0' />
			<View>
				<Title size={22} weight={'bold'}>
					{count}
				</Title>
				<Title size={15} weight={'regular'}>
					{description}
				</Title>
			</View>
		</View>
	)
}

export default Feature
