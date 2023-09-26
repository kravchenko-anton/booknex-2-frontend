import Layout from '@/components/layout/layout'
import HamburgerMenu from '@/components/ui/hamburger-menu/hamburger-menu'
import { Title } from '@/components/ui/title/title'

const Library = () => {
	return (
		<Layout className='flex-row items-center justify-between'>
			<HamburgerMenu
				position={'left'}
				elements={[
					{ title: 'Home', onPress: () => console.log('Home') },
					{ title: 'Library', onPress: () => console.log('Library') },
					{ title: 'Search', onPress: () => console.log('Search') },
					{ title: 'Profile', onPress: () => console.log('Profile') }
				]}
			/>
			<Title>Library</Title>
		</Layout>
	)
}

export default Library
