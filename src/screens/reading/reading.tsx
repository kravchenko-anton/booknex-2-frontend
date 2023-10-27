import { ReaderProvider } from '@/screens/reading/epub-reader/context'
import RenderEpub from '@/screens/reading/render-epub'
import ReadingUi from '@/screens/reading/settings/reading-ui'
import { SafeAreaView } from 'react-native-safe-area-context'
// TODO: сделать тут вертикальный скролл и настройки
const Reading = () => (
	<SafeAreaView className='flex-1'>
		<ReaderProvider>
			<RenderEpub />
			<ReadingUi />
		</ReaderProvider>
	</SafeAreaView>
)
export default Reading
