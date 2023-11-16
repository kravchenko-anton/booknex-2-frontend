import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { handleDoublePress } from '@/screens/reading/reader/additional-function'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/utils/dimensions'
import type { ReactNode } from 'react'
import React, { useEffect, useRef } from 'react'
import { View as RNView, TouchableWithoutFeedback } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview'
import type { ReaderProperties } from './types'

export function Reader({ id }: ReaderProperties): ReactNode {
	const { toggleReadingUi } = useAction()
	const WebViewReference = useRef<WebView>(null)
	const { colorScheme, padding, lineHeight, flow, font, fontSize } =
		useTypedSelector(state => state.readingSettings)
	const goToToc = () => {
		WebViewReference.current?.injectJavaScript(
			`         // get Element by text content Twenty-Four
							var element = document.;
							element.scrollIntoView({ behavior: 'smooth' });
							window.ReactNativeWebView.postMessage(JSON.stringify({
								type: "goToToc"
							}));
							`
		)
	}
	const styleTag = `body {
		background: ${colorScheme.theme.body.background} !important;
		font-family: ${font.fontFamily} !important;
		font-size: ${fontSize}px;
		line-height: ${lineHeight};
		padding: ${padding}px;
	}
	i {
		color: ${colorScheme.colorPalette.primary} !important;
	}
	span {
		color: ${colorScheme.colorPalette.text} !important;
	}
	p {
		color: ${colorScheme.colorPalette.text} !important;
	}
	li {
		color: ${colorScheme.colorPalette.text} !important;
	}
	a {
		color: ${colorScheme.colorPalette.secondary} !important;
		'font-weight': "bold !important";
		textDecoration: "none !important";
		'font-style': "italic !important";
	}
	h1 {
		font-size: ${fontSize * 1.6}px !important;
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
	}
	h2 {
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
		font-size: ${fontSize * 1.5}px !important;
	}
	h3 {
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
		font-size: ${fontSize * 1.4}px !important;
	}
	h4 {
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
		font-size: ${fontSize * 1.3}px !important;
	}
	h5 {
		'font-weight': "bold !important";
		font-size: ${fontSize * 1.2}px !important;
		color: ${colorScheme.colorPalette.primary} !important;
	}
	h6 {
		font-size: ${fontSize * 1.1}px !important;
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
	}
	'::selection' {
		background: ${colorScheme.colorPalette.primary} !important;
		color: ${colorScheme.colorPalette.text} !important;
	}
	ul {
		color: ${colorScheme.colorPalette.text} !important;
		'list-style-type': "none";
	}
	ol {
		color: ${colorScheme.colorPalette.text} !important;
		'list-style-type': "none";
	}
	strong {
		'font-weight': "bold !important" !important;
	}
	em {
		'font-style': "italic !important";
	}
	b {
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
	}`
	useEffect(() => {
		if (!WebViewReference.current) return

		WebViewReference.current.injectJavaScript(`
				var style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = \`${styleTag}\`;
				document.getElementsByTagName('head')[0].appendChild(style);
			`)
	}, [WebViewReference, styleTag])
	return (
		<GestureHandlerRootView className='m-0 h-screen w-screen p-0 pb-6'>
			<RNView className='m-0 h-full w-full items-center justify-center p-0'>
				<TouchableWithoutFeedback
					onPress={() => handleDoublePress(toggleReadingUi)}>
					<WebView
						menuItems={[]}
						showsVerticalScrollIndicator={false}
						javaScriptEnabled
						ref={WebViewReference}
						injectedJavaScriptBeforeContentLoaded={`
									var style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = \`${styleTag}\`;
				document.getElementsByTagName('head')[0].appendChild(style);
                var body = document.body;
                // do scroll progress of book in value
                var scrollProgress = 0;
                var scrollHeight = body.scrollHeight;
                var clientHeight = body.clientHeight;
                var scrollValue = scrollHeight / clientHeight;
			window.addEventListener('scroll', function() {
				scrollProgress = window.scrollY * scrollValue;
				window.ReactNativeWebView.postMessage(JSON.stringify({
					type: "scrollProgress",
					value: scrollProgress
				}));
			});
       
       
       
							`}
						source={{
							html: `
<body>
<p><a id="p6"></a></p><h2>Being struck speechless was a new experience for Kira, but then the man sitting across from her had a disturbing way of surprising her. </h2>
<p>Kira thought she saw momentary surprise flash across his face before he composed his expression. </p>
<p>Graydon shifted, the tension rolling off him drawing Kira's attention like a bee to honey. His eyes were fierce, his shoulders tense. </p>
<p>That's right. Breathe it in. She'd outmaneuvered him. </p>
<p>"I win," she mouthed. </p>
<p>His eyebrows snapped together. </p>
<p>"That doesn't mean anything," Kent tried. </p>
<p>"For someone of your position, you're not particularly smart," Jin said. </p>
<p>"The Tuann are sitting right here. What kind of people do you want them to think you are? The kind who would sacrifice your own people? The kind who lies for your own self-interests? You're not really presenting humans in a sympathetic light here." </p>
<p>"J1N, shut down," Kent snapped. "That's an order." </p>
<p>A chuckle rolled from Jin. <i>"I don't take orders from you, meat sack."</i> </p>
<p><a ></a>Kira ignored the exchange. </p>
<p>Himoto looked considering before he speared her with a gaze. "Well done, dear, but I still have one move left. You really shouldn't have wasted time gloating." </p>
<p>Kira's lips parted. </p>
<p>Himoto didn't wait, reaching forward and tapping a button out of sight. </p>
<p>There was a brief tone as Himoto's hologram snapped out of existence, leaving them staring at empty air. </p>
<p>Kira shook her head and blinked. She stood slowly. </p>
<p>He couldn't have. </p>
<p>A smile broadened on Kent's face. "Remember—last order given." </p>
<p>Then Kent's feed snapped off too. </p>
<p>Kira shook her head again. No. This wasn't happening. </p>
<p>"I'll be damned. That old fox outsmarted you," Jin said with awe. </p>
<p>Kira's teeth clenched; her gaze still focused on the spot where Himoto had been. </p>
<p>"The regulation you cited only works if you can confirm receipt of your resignation," Raider said thoughtfully. "Until you do, you're still considered active." </p>
<p>"Which means you have to obey the last order given," Jace finished. </p>
<p>And that was to accompany the Roake home. </p>
<p>Graydon's smirk caught her eye. He mouthed, "I guess it's still my win, <i>coli</i>." </p>
<p>Kira inhaled deeply. Strangling the Emperor's Face wouldn't help her situation—even if it would make her feel better. </p>
<p>Kira slapped her hands on the table and shoved her seat back. "No, I'll find him and cram that resignation down his throat." </p>
<a id='p4'></a>
<p>Himoto wasn't winning like this. </p>
<p>"That would be considered leaving your post without orders. You'd be considered AWOL," Raider said, studying his fingernails. "They still court-martial for that." </p>
<p>"I don't care," Kira hissed, too far gone to care about the ramifications of her actions any longer. </p>
<p>"Oh, boy," Jin said. "She's snapped. Someone needs to do something before she does something drastic." </p>
<p>"You're dying," Shandry said, her words cutting through the drama. </p>
</body>`
						}}
						originWhitelist={['*']}
						scrollEnabled={true}
						mixedContentMode='compatibility'
						onMessage={event => {
							console.log(event.nativeEvent.data)
						}}
						allowUniversalAccessFromFileURLs
						allowFileAccessFromFileURLs
						allowFileAccess
						style={{
							width: WINDOW_WIDTH,
							backgroundColor: colorScheme.colorPalette.background,
							height: WINDOW_HEIGHT,
							zIndex: 1,
							padding: 0,
							margin: 0
						}}
					/>
				</TouchableWithoutFeedback>
			</RNView>
		</GestureHandlerRootView>
	)
}
