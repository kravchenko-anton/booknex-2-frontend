import { useAction } from '@/hooks/useAction'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { Reader } from '@/screens/reading/epub-reader/reader'
import { getFileUrl } from '@/services/api-config'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/utils/dimensions'
import type { FC } from 'react'
import { useEffect } from 'react'
// TODO: сделать тут вертикальный скролл и настройки
const RenderEpub: FC = () => {
	const { params } = useTypedRoute<'Reading'>()
	const { changeFontFamily } = useAction() // TODO: сделать настройки шрифта бо щас не работает
	useEffect(() => {
		changeFontFamily('Impact, fantasy')
		console.log('change font family')
	}, [])
	return (
		<Reader
			flow={'scrolled'}
			src={getFileUrl(params.epub)}
			width={WINDOW_WIDTH}
			height={WINDOW_HEIGHT}
		/>
	)
}

export default RenderEpub
