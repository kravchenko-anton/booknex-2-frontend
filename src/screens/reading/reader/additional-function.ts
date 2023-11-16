import type { WebviewMessage } from '@/screens/reading/reader/types'
import type { WebViewMessageEvent } from 'react-native-webview'

let lastTap: number | null = null
let timer: NodeJS.Timeout
export const handleDoublePress = (handleAction: () => void) => {
	if (lastTap) {
		handleAction()
		clearTimeout(timer)
		lastTap = null
	} else {
		lastTap = Date.now()
		timer = setTimeout(() => {
			lastTap = null
			clearTimeout(timer)
		}, 300)
	}
}

export const onMessage = (event: WebViewMessageEvent) => {
	const parsedEvent = JSON.parse(event.nativeEvent.data) as WebviewMessage
	const { type } = parsedEvent
	console.log(parsedEvent)
	if (type === 'atStart') {
		console.log('atStart')
	}
	if (type === 'atEnd') {
		console.log('atEnd')
	}
	if (type === 'onLocationChange') {
		const { currentLocation, progress } = parsedEvent
		console.log('onLocationChange', currentLocation, progress)
	}

	if (type === 'onSelected') {
		const { cfiRange, text } = parsedEvent
		console.log('onSelected', cfiRange, text)
	}

	if (type === 'onMarkPressed') {
		const { cfiRange, text } = parsedEvent
		console.log('onMarkPressed', cfiRange, text)
	}

	if (type === 'onBeginning') {
		console.log('onBeginning')
	}

	if (type === 'onFinish') {
		console.log('onFinish')
	}
}
