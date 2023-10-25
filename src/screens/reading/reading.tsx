import { ReaderProvider } from '@/screens/reading/epub-reader/context'
import RenderEpub from '@/screens/reading/useEpubFileSystem/render-epub/render-epub'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
// TODO: сделать тут вертикальный скролл и настройки
const Reading = () => (
	<SafeAreaView className='flex-1'>
		<ReaderProvider>
			<RenderEpub />
		</ReaderProvider>
		<StatusBar hidden={true} />
	</SafeAreaView>
)

export default Reading
