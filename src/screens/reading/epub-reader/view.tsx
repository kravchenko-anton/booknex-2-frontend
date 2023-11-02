import BigLoader from '@/components/ui/loader/big-loader'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ThemeColor } from '@/redux/reading-settings/reading-settings-slice'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/utils/dimensions'
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
import type { ReaderProperties, WebviewMessage } from './types'

export type ViewProperties = Omit<ReaderProperties, 'src'> & {
	templateUri: string
	allowedUris: string
}
export function View({
	templateUri,
	allowedUris,
	id
}: ViewProperties): ReactNode {
	const {
		setToc,
		setTotalLocations,
		setCurrentLocation,
		clearSearch,
		clearGoToLocation,
		setProgress,
		goToLocation,
		setLocations,
		setIsRendering,
		addLastBookLocations,
		setSearchResults,
		toggleReadingUi
	} = useAction()
	const WebViewReference = useRef<WebView>(null)
	const {
		isRendering,
		searchTerm,
		isLoading,
		goLocation,
		currentLocation: stateCurrentLocation
	} = useTypedSelector(state => state.reader)
	const { theme, flow, fontFamily, fontSize, lastBookLocations } =
		useTypedSelector(state => state.readingSettings)

	useEffect(() => {
		if (goLocation) {
			WebViewReference.current?.injectJavaScript(
				`rendition.display('${goLocation}'); true`
			)
			clearGoToLocation()
		}
	}, [goLocation])

	useEffect(() => {
		if (searchTerm) {
			WebViewReference.current?.injectJavaScript(`
      Promise.all(
        book.spine.spineItems.map((item) => {
          return item.load(book.load.bind(book)).then(() => {
            let results = item.find('${searchTerm}'.trim());
            item.unload();
            return Promise.resolve(results);
          });
        })
      ).then((results) =>
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'onSearch', results: [].concat.apply([], results) })
        )
      ); true
    `)
			clearSearch()
		}
	}, [searchTerm])

	useEffect(() => {
		WebViewReference.current?.injectJavaScript(`
       rendition.themes.register({ theme: ${JSON.stringify(theme)} });
       rendition.themes.select('theme');
       rendition.views().forEach(view => view.pane ? view.pane.render() : null); true;
     `)
	}, [theme])

	useEffect(() => {
		WebViewReference.current?.injectJavaScript(
			`rendition.themes.font('${fontFamily}');`
		)
	}, [fontFamily])

	useEffect(() => {
		WebViewReference.current?.injectJavaScript(`
			 rendition.themes.fontSize('${fontSize}'); true
		 `)
	}, [fontSize])
	const onMessage = (event: WebViewMessageEvent) => {
		const parsedEvent = JSON.parse(event.nativeEvent.data) as WebviewMessage
		const { type } = parsedEvent

		if (type === 'onStarted') setIsRendering(true)

		if (type === 'onReady') {
			const { totalLocations, currentLocation, progress } = parsedEvent
			setIsRendering(false)
			setTotalLocations(totalLocations)
			setCurrentLocation(currentLocation)
			setProgress(progress)
			const lastLocation = lastBookLocations?.find(item => item.id === id)

			if (!lastLocation) return
			setProgress(lastLocation.progress)
			goToLocation(lastLocation.location)
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
			addLastBookLocations({
				id,
				progress,
				location: currentLocation.start.cfi
			})
		}

		if (type === 'onSearch') {
			const { results } = parsedEvent
			setSearchResults(results)
			// search
		}

		if (type === 'onLocationsReady') {
			const { locations } = parsedEvent
			setLocations(locations)
		}

		if (type === 'onSelected') {
			const { cfiRange, text, htmlElement } = parsedEvent
			console.log('onSelected', htmlElement)
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

		if (type === 'onRendered') {
			const { section, currentSection } = parsedEvent
			console.log('onRendered', section, currentSection)
		}

		if (type === 'onLayout') {
			const { layout } = parsedEvent
			console.log('onLayout', layout)
		}

		if (type === 'onNavigationLoaded') {
			const { toc } = parsedEvent
			setToc(toc)
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
		<GestureHandlerRootView
			className='m-0 p-0'
			style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT }}>
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
								<BigLoader
									backgroundColor={ThemeColor(theme.body.background)}
								/>
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
									width: WINDOW_WIDTH,
									backgroundColor: ThemeColor(theme.body.background),
									height: WINDOW_HEIGHT,
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
