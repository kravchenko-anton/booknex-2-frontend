import RenderEpub from '@/screens/reading/render-epub'
import ReadingUi from '@/screens/reading/settings/reading-ui'
import { SafeAreaView } from 'react-native-safe-area-context'
// TODO: сделать тут вертикальный скролл и настройки
const Reading = () => (
	<SafeAreaView className='flex-1'>
		<RenderEpub />
		<ReadingUi />
	</SafeAreaView>
)
export default Reading
