import { useTypedRoute } from '@/hooks/useTypedRoute'
import { Reader } from '@/screens/reading/epub-reader'
import { ReaderProvider } from '@/screens/reading/epub-reader/context'
import { useFileSystem } from '@/screens/reading/epub-reader/useEpubFileSystem'
import { getFileUrl } from '@/services/api-config'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/utils/dimensions'
// TODO: сделать тут вертикальный скролл и настройки
const Reading = () => {
	const { params } = useTypedRoute<'Reading'>()
	console.log(params)
	return (
		<ReaderProvider>
			<Reader
				src={getFileUrl(params.epub)}
				width={WINDOW_WIDTH}
				height={WINDOW_HEIGHT}
				fileSystem={useFileSystem}
			/>
		</ReaderProvider>
	)
}

export default Reading
