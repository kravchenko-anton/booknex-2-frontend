import { Title } from '@/components/ui/title/title'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export function OpeningBook() {
	return (
		<View className='h-screen w-screen flex-1 items-center justify-center'>
			<ActivityIndicator size='large' />
			<Title size={16} weight={'medium'}>
				Opening
			</Title>
		</View>
	)
}
