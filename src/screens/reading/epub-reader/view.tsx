import BigLoader from '@/components/ui/loader/big-loader'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { defaultTheme } from '@/redux/epub-reader-slice/epub-reader-slice'
import type { ReactNode } from 'react'
import React, { useEffect, useRef } from 'react'
import {
	I18nManager,
	View as RNView,
	TouchableWithoutFeedback
} from 'react-native'
import {
	Directions,
	FlingGestureHandler,
	GestureHandlerRootView,
	State
} from 'react-native-gesture-handler'
import type { WebViewMessageEvent } from 'react-native-webview'
import { WebView } from 'react-native-webview'
import type { EPubCfi, Location, ReaderProperties, SearchResult } from './types'

export type ViewProperties = Omit<ReaderProperties, 'src' | 'fileSystem'> & {
	templateUri: string
	allowedUris: string
}
// TODO: убрать передачу пропсов и сделать через redux
export function View({
	templateUri,
	flow,
	allowedUris,
	width,
	height
}: ViewProperties): ReactNode {
	const {
		registerBook,
		setTotalLocations,
		setCurrentLocation,
		setProgress,
		setLocations,
		setAtStart,
		setAtEnd,
		goNext,
		goPrevious,
		setIsRendering,
		goToLocation,
		changeTheme,
		setKey,
		setSearchResults,
		toggleReadingUi
	} = useAction()
	const { isRendering, theme } = useTypedSelector(state => state.reader)
	const book = useRef<WebView>(null)

	useEffect(() => {
		if (book.current) {
			registerBook(book.current)
		}
	}, [book.current])
	const onMessage = (event: WebViewMessageEvent) => {
		const parsedEvent = JSON.parse(event.nativeEvent.data) as {
			type: string
			totalLocations: number
			currentLocation: Location
			progress: number
			reason: string
			layout: string
			epubKey: string
			locations: EPubCfi[]
			results: SearchResult[]
			cfiRange: string
			text: string
			section: string
			currentSection: string
			toc: string
		}

		const { type } = parsedEvent

		if (type === 'onStarted') {
			setIsRendering(true)
			changeTheme(defaultTheme)
		}

		if (type === 'onReady') {
			const { totalLocations, currentLocation, progress } = parsedEvent
			setIsRendering(false)
			setTotalLocations(totalLocations)
			setCurrentLocation(currentLocation)
			setProgress(progress)
			// if (initialLocation) {
			// TODO: сделать в стейте настроек запись о последней странице и переход к ней сразу
			// goToLocation(initialLocation)
			// }
		}

		if (type === 'onDisplayError') {
			const { reason } = parsedEvent
			setIsRendering(false)
			console.log('onDisplayError', reason)
		}

		if (type === 'onLocationChange') {
			const { totalLocations, currentLocation, progress } = parsedEvent
			setTotalLocations(totalLocations)
			setCurrentLocation(currentLocation)
			setProgress(progress)
			if (currentLocation.atStart) setAtStart(true)
			else if (currentLocation.atEnd) setAtEnd(true)
			else {
				setAtStart(false)
				setAtEnd(false)
			}

			// console.log('onLocationChange', currentLocation)
		}

		if (type === 'onSearch') {
			const { results } = parsedEvent
			setSearchResults(results)
			// search
		}

		if (type === 'onLocationsReady') {
			const { epubKey, locations } = parsedEvent
			setLocations(locations)
			setKey(epubKey)
			// location ready
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
			setAtStart(true)
			console.log('onBeginning')
		}

		if (type === 'onFinish') {
			setAtEnd(true)
			console.log('onFinish')
		}

		if (type === 'onRendered') {
			const { section, currentSection } = parsedEvent
			console.log('onRendered', section, currentSection)
		}

		if (type === 'onLayout') {
			const { layout } = parsedEvent
			console.log('onLayout', layout)
		}

		if (type === 'onNavigationLoaded') {
			// const { toc } = parsedEvent
			// console.log('onNavigationLoaded', toc)
		}
	}
	let lastTap: number | null = null
	let timer: NodeJS.Timeout
	const handleDoublePress = () => {
		if (lastTap) {
			toggleReadingUi()
			console.log('double')
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

	return (
		<GestureHandlerRootView className='m-0 p-0' style={{ width, height }}>
			<FlingGestureHandler
				direction={I18nManager.isRTL ? Directions.LEFT : Directions.RIGHT}
				onHandlerStateChange={({ nativeEvent }) => {
					if (nativeEvent.state === State.ACTIVE && flow === 'paginated') {
						goPrevious()
						console.log('swipe right')
					}
				}}>
				<FlingGestureHandler
					direction={I18nManager.isRTL ? Directions.RIGHT : Directions.LEFT}
					onHandlerStateChange={({ nativeEvent }) => {
						if (nativeEvent.state === State.ACTIVE && flow === 'paginated') {
							goNext()
							console.log('swipe left')
						}
					}}>
					<RNView className='m-0  h-full items-center justify-center p-0'>
						{isRendering && (
							<RNView className='absolute top-0 z-[2] m-0 h-full w-full p-0'>
								<BigLoader />
							</RNView>
						)}

						<TouchableWithoutFeedback onPress={handleDoublePress}>
							<WebView
								ref={book}
								menuItems={[]}
								source={{ uri: templateUri }}
								showsVerticalScrollIndicator={false}
								javaScriptEnabled
								originWhitelist={['*']}
								scrollEnabled={true}
								mixedContentMode='compatibility'
								onMessage={onMessage}
								allowingReadAccessToURL={allowedUris}
								allowUniversalAccessFromFileURLs
								allowFileAccessFromFileURLs
								allowFileAccess
								onShouldStartLoadWithRequest={request => {
									if (
										!isRendering &&
										request.mainDocumentURL &&
										request.url !== request.mainDocumentURL
									) {
										goToLocation(
											request.url.replace(request.mainDocumentURL, '')
										)
									}
									return true
								}}
								style={{
									width,
									backgroundColor: theme.body.background,
									height,
									zIndex: 1,
									padding: 0,
									margin: 0
								}}
							/>
						</TouchableWithoutFeedback>
					</RNView>
				</FlingGestureHandler>
			</FlingGestureHandler>
		</GestureHandlerRootView>
	)
}
