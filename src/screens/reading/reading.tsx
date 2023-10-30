import { useTypedRoute } from '@/hooks/useTypedRoute'
import { Reader } from '@/screens/reading/epub-reader/reader'
import ReadingUi from '@/screens/reading/settings/reading-ui'
import { getFileUrl } from '@/services/api-config'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/utils/dimensions'
import { SafeAreaView } from 'react-native-safe-area-context'
// TODO: сделать тут вертикальный скролл и настройки
const Reading = () => {
	const { params } = useTypedRoute<'Reading'>()

	return (
		<SafeAreaView className='flex-1'>
			<Reader
				flow={'scrolled'}
				src={getFileUrl(params.epub)}
				width={WINDOW_WIDTH}
				height={WINDOW_HEIGHT}
			/>
			<ReadingUi />
		</SafeAreaView>
	)
}
export default Reading
