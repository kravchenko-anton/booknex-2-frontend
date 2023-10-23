import Button from '@/components/ui/button/button'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import type { FC } from 'react'
import { View } from 'react-native'
// TODO: сделать глобальный allert компонент для всего
const Alert: FC = () => {
	const { alert } = useTypedSelector(state => state.alert)
	const { closeAlert } = useAction()
	if (!alert) return null
	// TODO: добавить анимашку к алерту
	return (
		<View className='absolute h-full w-full items-center justify-center bg-[#0000004a]'>
			<View
				pointerEvents={'box-none'}
				className='w-11/12 items-center rounded-xl bg-dust p-4'>
				<Title size={28} className='mb-4 mt-2' center weight={'bold'}>
					{alert.title}
				</Title>
				<Title
					size={16}
					className='px-2'
					weight={'regular'}
					numberOfLines={2}
					center>
					{alert.description}
				</Title>

				<Button
					text={alert.acceptText}
					onPress={alert.onAccept}
					className='mt-5 w-4/5'
					variant={alert.type}
					size={'medium'}
				/>
				<Button
					onPress={() => closeAlert()}
					text='Cancel'
					className='mt-4 w-2/3'
					variant={'dust'}
					size={'medium'}
				/>
			</View>
		</View>
	)
}

export default Alert
