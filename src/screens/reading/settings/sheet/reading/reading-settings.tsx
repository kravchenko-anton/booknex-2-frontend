import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import type { FC } from 'react'
import { View } from 'react-native'

const ReadingSettings: FC = () => {
	console.log(ReadingSettings)
	return (
		<View>
			<Title>ReadingSettings</Title>
			<Image
				height={500}
				width={250}
				url={
					'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'
				}
			/>
		</View>
	)
}

export default ReadingSettings
