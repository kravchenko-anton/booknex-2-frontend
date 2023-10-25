import { Title } from '@/components/ui/title/title'
import type { LoadingFileProperties } from '@/screens/reading/epub-reader'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export function LoadingFile({ downloadProgress }: LoadingFileProperties) {
	return (
		<View className='h-screen w-screen flex-1 items-center justify-center'>
			<ActivityIndicator size='large' />

			<Title
				size={16}
				weight={'medium'}>{`Loading ${downloadProgress}%`}</Title>
		</View>
	)
}
