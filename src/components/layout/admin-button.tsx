import Icon from '@/components/ui/icon/icon'
import { useAuth } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useRoute } from '@react-navigation/native'

const AdminButton = () => {
	const { navigate } = useTypedNavigation()
	const { user } = useAuth()
	const { name } = useRoute()
	// TODO: Добавить по роуту проверку
	if ((user && !user?.isAdmin) || !user || name === 'Statistic') return
	return (
		<Icon
			onPress={() => {
				navigate('Statistic')
			}}
			name={'key'}
			size={'medium'}
			className='absolute bottom-3 left-[-1.5px] w-[50px] rounded-l-none bg-pale'
			variant={'outlined'}
		/>
	)
}

export default AdminButton
