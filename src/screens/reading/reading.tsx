import { ReaderProvider } from '@/screens/reading/epub-reader/context'
import RenderEpub from '@/screens/reading/useEpubFileSystem/render-epub/render-epub'
// TODO: сделать тут вертикальный скролл и настройки
const Reading = () => (
	<ReaderProvider>
		<RenderEpub />
	</ReaderProvider>
)

export default Reading
