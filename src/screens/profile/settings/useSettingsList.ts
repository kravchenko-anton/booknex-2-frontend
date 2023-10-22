import { useAction } from '@/hooks/useAction'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

export const useSettingsList = () => {
	const { logout } = useAction()
	const { navigate } = useTypedNavigation()
	// TODO: сделать тут попап с  отправкой email
	// TODO: доделать все пункты меню
	return [
		{
			title: 'Support',
			list: [
				{
					title: 'Get help',
					icon: 'smiley',
					onPress: () => console.log('Help')
				},
				{
					title: 'Give feedback',
					icon: 'star',
					onPress: () => console.log('Feedback')
				},
				{
					title: 'Report a bug',
					icon: 'bug',
					onPress: () => console.log('Rate')
				}
			]
		},
		// {
		// 	title: 'Additional',
		// 	list: [
		// 		{
		// 			title: 'Theme',
		// 			icon: 'moon',
		// 			onPress: () => console.log('Theme')
		// 		},
		// 		{
		// 			title: 'Language',
		// 			icon: 'globe',
		// 			onPress: () => console.log('Language')
		// 		},
		// 		{
		// 			title: 'Privacy policy',
		// 			icon: 'shield',
		// 			onPress: () => console.log('Privacy')
		// 		},
		// 		{
		// 			title: 'Terms of use',
		// 			icon: 'book',
		// 			onPress: () => console.log('Terms')
		// 		}
		// 	]
		// },
		{
			title: 'Account',
			list: [
				{
					title: 'Edit Account',
					icon: 'person',
					onPress: () => navigate('UpdateProfile')
				},
				// {
				// 	title: 'Subscription',
				// 	icon: 'credit-card',
				// 	onPress: () => console.log('Subscription')
				// },
				{
					title: 'Sign out',
					icon: 'sign-out',
					onPress: () => logout()
				}
			]
		}
	]
}
