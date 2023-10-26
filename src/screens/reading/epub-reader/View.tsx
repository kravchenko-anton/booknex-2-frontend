import BigLoader from '@/components/ui/loader/big-loader'
import React, { useContext, useEffect, useRef } from 'react'
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
import { ReaderContext, defaultTheme as initialTheme } from './context'
import type { EPubCfi, Location, ReaderProperties, SearchResult } from './types'

export type ViewProperties = Omit<ReaderProperties, 'src' | 'fileSystem'> & {
	templateUri: string
	allowedUris: string
}

export function View({
	templateUri,
	flow,
	allowedUris,
	onStarted = () => {},
	onReady = () => {},
	onDisplayError = () => {},
	onResized = () => {},
	onLocationChange = () => {},
	onRendered = () => {},
	onSearch = () => {},
	onLocationsReady = () => {},
	onSelected = () => {},
	onMarkPressed = () => {},
	onOrientationChange = () => {},
	onLayout = () => {},
	onNavigationLoaded = () => {},
	onBeginning = () => {},
	onFinish = () => {},
	onPress = () => {},
	onDoublePress = () => {},
	width,
	height,
	initialLocation,
	enableSwipe = true,
	onSwipeLeft = () => {},
	onSwipeRight = () => {},
	defaultTheme = initialTheme,
	renderOpeningBookComponent = () => <BigLoader />
}: ViewProperties) {
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
		isRendering,
		setIsRendering,
		goToLocation,
		changeTheme,
		setKey,
		setSearchResults,
		theme
	} = useContext(ReaderContext)
	const book = useRef<WebView>(null)

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
			orientation: '-90' | '0' | '90'
			section: string
			currentSection: string
			toc: string
		}

		const { type } = parsedEvent

		if (type === 'onStarted') {
			setIsRendering(true)
			changeTheme(defaultTheme)
			return onStarted()
		}

		if (type === 'onReady') {
			const { totalLocations, currentLocation, progress } = parsedEvent
			setIsRendering(false)
			setTotalLocations(totalLocations)
			setCurrentLocation(currentLocation)
			setProgress(progress)
			if (initialLocation) {
				goToLocation(initialLocation)
			}

			return onReady(totalLocations, currentLocation, progress)
		}

		if (type === 'onDisplayError') {
			const { reason } = parsedEvent
			setIsRendering(false)

			return onDisplayError(reason)
		}

		if (type === 'onResized') {
			const { layout } = parsedEvent

			return onResized(layout)
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
			return onLocationChange(totalLocations, currentLocation, progress)
		}

		if (type === 'onSearch') {
			const { results } = parsedEvent
			setSearchResults(results)
			return onSearch(results)
		}

		if (type === 'onLocationsReady') {
			const { epubKey, locations } = parsedEvent
			setLocations(locations)
			setKey(epubKey)
			return onLocationsReady(epubKey, locations)
		}

		if (type === 'onSelected') {
			const { cfiRange, text } = parsedEvent
			return onSelected(text, cfiRange)
		}

		if (type === 'onMarkPressed') {
			const { cfiRange, text } = parsedEvent
			return onMarkPressed(cfiRange, text)
		}

		if (type === 'onOrientationChange') {
			const { orientation } = parsedEvent
			return onOrientationChange(orientation)
		}

		if (type === 'onBeginning') {
			setAtStart(true)
			return onBeginning()
		}

		if (type === 'onFinish') {
			setAtEnd(true)
			return onFinish()
		}

		if (type === 'onRendered') {
			const { section, currentSection } = parsedEvent
			return onRendered(section, currentSection)
		}

		if (type === 'onLayout') {
			const { layout } = parsedEvent
			return onLayout(layout)
		}

		if (type === 'onNavigationLoaded') {
			const { toc } = parsedEvent
			return onNavigationLoaded(toc)
		}
		return () => {}
	}

	useEffect(() => {
		if (book.current) registerBook(book.current)
	}, [registerBook])

	let lastTap: number | null = null
	let timer: NodeJS.Timeout

	const handleDoublePress = () => {
		if (lastTap) {
			onDoublePress()
			clearTimeout(timer)
			lastTap = null
		} else {
			lastTap = Date.now()
			timer = setTimeout(() => {
				onPress()
				lastTap = null
				clearTimeout(timer)
			}, 300)
		}
	}

	return (
		<GestureHandlerRootView style={{ width, height, padding: 0, margin: 0 }}>
			<FlingGestureHandler
				direction={I18nManager.isRTL ? Directions.LEFT : Directions.RIGHT}
				onHandlerStateChange={({ nativeEvent }) => {
					if (
						nativeEvent.state === State.ACTIVE &&
						enableSwipe &&
						flow === 'paginated'
					) {
						goPrevious()
						onSwipeRight()
					}
				}}>
				<FlingGestureHandler
					direction={I18nManager.isRTL ? Directions.RIGHT : Directions.LEFT}
					onHandlerStateChange={({ nativeEvent }) => {
						if (
							nativeEvent.state === State.ACTIVE &&
							enableSwipe &&
							flow === 'paginated'
						) {
							goNext()
							onSwipeLeft()
						}
					}}>
					<RNView
						style={{
							height: '100%',
							justifyContent: 'center',
							alignItems: 'center',
							padding: 0,
							margin: 0
						}}>
						{isRendering && (
							<RNView
								style={{
									width: '100%',
									height: '100%',
									position: 'absolute',
									top: 0,
									zIndex: 2,
									padding: 0,
									margin: 0
								}}>
								{renderOpeningBookComponent()}
							</RNView>
						)}

						<TouchableWithoutFeedback onPress={handleDoublePress}>
							<WebView
								ref={book}
								menuItems={
									[
										// TODO: сделать кастомное меню, и ещё справа если quotes популярная срока то делать справа мини блок для емодзи
									]
								}
								suppressMenuItems={['copy', 'share']}
								onCustomMenuSelection={webViewEvent => {
									const { label, key, selectedText } = webViewEvent.nativeEvent
									console.log(
										'Custom Menu Item Clicked:',
										label,
										'::',
										key,
										'::',
										selectedText
									)
								}}
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
