import BigLoader from '@/components/ui/loader/big-loader'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
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
		setTotalLocations,
		setCurrentLocation,
		setProgress,
		setLocations,
		setAtStart,
		setAtEnd,
		setIsRendering,
		changeTheme,
		setKey,
		setSearchResults,
		toggleReadingUi
	} = useAction()
	const WebViewReference = useRef<WebView>(null)
	const {
		isRendering,
		theme,
		isLoading,
		fontFamily,
		fontSize,
		currentLocation: stateCurrentLocation
	} = useTypedSelector(state => state.reader)
	useEffect(() => {
		WebViewReference.current?.injectJavaScript(`
       rendition.themes.register({ theme: ${JSON.stringify(theme)} });
       rendition.themes.select('theme');
       rendition.views().forEach(view => view.pane ? view.pane.render() : null); true;
     `)
		console.log('theme', theme)
	}, [theme])

	useEffect(() => {
		WebViewReference.current?.injectJavaScript(
			`rendition.themes.font('${fontFamily}');`
		)
		console.log('fontFamily', fontFamily)
	}, [fontFamily])

	useEffect(() => {
		WebViewReference.current?.injectJavaScript(`
			 rendition.themes.fontSize('${fontSize}'); true
		 `)
	}, [fontSize])
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
			const { currentLocation, progress } = parsedEvent
			if (
				stateCurrentLocation?.end.displayed.page ===
				currentLocation.end.displayed.page
			)
				return
			setCurrentLocation(currentLocation)
			setProgress(progress)
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
						WebViewReference.current?.injectJavaScript('rendition.prev(); true')
					}
				}}>
				<FlingGestureHandler
					direction={I18nManager.isRTL ? Directions.RIGHT : Directions.LEFT}
					onHandlerStateChange={({ nativeEvent }) => {
						if (nativeEvent.state === State.ACTIVE && flow === 'paginated') {
							WebViewReference.current?.injectJavaScript(
								'rendition.next(); true'
							)
						}
					}}>
					<RNView className='m-0 h-full w-full items-center justify-center p-0'>
						{(isLoading || isRendering) && (
							<RNView className='absolute bottom-0 left-0 right-0 top-0 z-50 m-0 h-full w-full bg-primary p-0'>
								<BigLoader />
							</RNView>
						)}

						<TouchableWithoutFeedback onPress={handleDoublePress}>
							<WebView
								ref={WebViewReference}
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
										WebViewReference.current?.injectJavaScript(
											`rendition.display('${request.url.replace(
												request.mainDocumentURL,
												''
											)}'); true`
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
