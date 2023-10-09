import Header from '@/components/header/header'
import ScrollLayout from '@/components/layout/scroll-layout'
import Button from '@/components/ui/button/button'
import FlatList from '@/components/ui/flatlist/flatlist'
import Icon from '@/components/ui/icon/icon'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { userServices } from '@/services/user-service'
import { Color } from '@/utils/color'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const Profile = () => {
	const { data: profile } = useQuery(['user-profile'], () =>
		userServices.getProfile()
	)
	const { navigate } = useTypedNavigation()
	const { logout } = useAction()
	if (!profile) return <BigLoader />
	// TODO: делать тут аниминованный лист
	return (
		<ScrollLayout className='px-4'>
			<Header
				rightIcon={{
					onPress: () => {
						navigate('UpdateProfile')
					},
					name: 'pencil'
				}}
			/>
			<View className='items-center self-center '>
				<Image
					className='rounded-3xl bg-gray p-4'
					height={150}
					width={150}
					url={profile.picture}
				/>

				<Title className='mt-2 text-center' size={36} weight={'bold'}>
					{profile.name}
				</Title>
			</View>
			<Title className='mt-8' weight={'semiBold'} size={32}>
				Statistics
			</Title>
			<FlatList
				scrollEnabled={false}
				className='my-2'
				data={profile.statistics}
				renderItem={({ item }) => (
					<View className='flex-row items-center justify-between rounded-xl bg-dust p-4'>
						<View>
							<Title weight={'bold'} size={24}>
								{item.count}
							</Title>
							<Title weight={'light'} size={18} color={Color.gray}>
								{item.name}
							</Title>
						</View>
						<Icon
							name={item.icon}
							size={'large'}
							color={Color.secondary}
							variant={'ghost'}
						/>
					</View>
				)}
			/>
			<Button
				className='my-4'
				text={'Logout'}
				size={'medium'}
				variant={'primary'}
				onPress={() => logout()}
			/>
		</ScrollLayout>
	)
}

export default Profile
