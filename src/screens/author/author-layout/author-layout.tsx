import Header from '@/components/header/header'
import LargeHeaderScrollLayout from '@/components/layout/header-scroll-layout/large-header-scroll-layout'
import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import { AuthorLayoutProperties } from '@/screens/author/author-layout/author-layout-types'
import { Color } from '@/utils/color'
import { FC, PropsWithChildren } from 'react'
import { Share, View } from 'react-native'

const AuthorLayout: FC<PropsWithChildren<AuthorLayoutProperties>> = ({
	children,
	...properties
}) => {
	return (
		<LargeHeaderScrollLayout
			animatedHeader={{
				title: properties.name,
				transientValue: 195,
				rightIcon: {
					name: 'share-android',
					onPress: () =>
						Share.share({
							message: `${properties.name} is a great author! Check him on Booknex!`
						})
				}
			}}
			headerChildren={
				<View
					style={{
						backgroundColor: properties.backgroundColor
					}}
					className='h-[250px]'>
					<View className='flex-1 bg-[#0000009a]  p-4 pt-0'>
						<Header
							color={Color.white}
							rightIcon={{
								name: 'share-android',
								onPress: () =>
									Share.share({
										message: `${properties.name} is a great author! Check him on Booknex!`
									})
							}}
						/>
						<Image
							url={properties.picture}
							className='mb-4 mt-2 self-center'
							height={100}
							width={100}
						/>
						<Title
							size={26}
							color={Color.white}
							center={true}
							weight={'bold'}
							numberOfLines={2}>
							{properties.name}
						</Title>
					</View>
				</View>
			}>
			{children}
		</LargeHeaderScrollLayout>
	)
}

export default AuthorLayout
