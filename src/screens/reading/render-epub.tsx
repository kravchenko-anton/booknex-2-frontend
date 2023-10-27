import { useTypedRoute } from '@/hooks/useTypedRoute'
import { Reader } from '@/screens/reading/epub-reader/Reader'
import { useFileSystem } from '@/screens/reading/useEpubFileSystem'
import { getFileUrl } from '@/services/api-config'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/utils/dimensions'
import type { FC } from 'react'
// TODO: сделать тут вертикальный скролл и настройки
const RenderEpub: FC = () => {
	const { params } = useTypedRoute<'Reading'>()
	return (
		<Reader
			flow={'scrolled'}
			src={getFileUrl(params.epub)}
			width={WINDOW_WIDTH}
			height={WINDOW_HEIGHT}
			fileSystem={useFileSystem}
		/>
	)
}

export default RenderEpub
