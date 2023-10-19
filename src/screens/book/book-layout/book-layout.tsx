import Header from '@/components/header/header'
import LargeHeaderScrollLayout from '@/components/layout/header-scroll-layout/large-header-scroll-layout'
import HamburgerMenu from '@/components/ui/hamburger-menu/hamburger-menu'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { BookLayoutProperties } from '@/screens/book/book-layout/book-layout-types'
import { Color } from '@/utils/color'
import { FC, PropsWithChildren } from 'react'
import { Share, View } from 'react-native'

const BookLayout: FC<PropsWithChildren<BookLayoutProperties>> = ({
	children,
	...properties
}) => {
	const { navigate } = useTypedNavigation()
	return (
		<LargeHeaderScrollLayout
			animatedHeader={{
				title: properties.title,
				transientValue: 85,
				rightIcon: (
					<HamburgerMenu
						position={'right'}
						elements={properties.hamburgerMenuElements}
					/>
				)
			}}
			headerChildren={
				<View
					style={{
						backgroundColor: properties.backgroundColor
					}}
					className='h-[230px] p-4 pt-0'>
					<Header
						color={Color.white}
						rightIcon={{
							name: 'share-android',
							onPress: () =>
								Share.share({
									message: `Wow! I see ${properties.title} book on Booknex and I think you will like it too!`
								})
						}}
					/>
					<Title
						size={26}
						color={Color.white}
						weight={'bold'}
						numberOfLines={2}>
						{properties.title}
					</Title>
					<Title
						size={18}
						className='mt-2 w-1/2'
						weight={'bold'}
						onPress={() => {
							navigate('Author', { id: properties.author.id })
						}}
						color={Color.dust}>
						{properties.author.name}
					</Title>
				</View>
			}>
			{children}
		</LargeHeaderScrollLayout>
	)
}

export default BookLayout
