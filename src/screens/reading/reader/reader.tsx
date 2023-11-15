import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/utils/dimensions'
import type { ReactNode } from 'react'
import React, { useRef } from 'react'
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

export type ViewProperties = Omit<ReaderProperties, 'src'> &
	NonNullable<unknown>
export function Reader({ id }: ReaderProperties): ReactNode {
	const {
		setCurrentLocation,
		setProgress,
		addLastBookLocations,
		toggleReadingUi
	} = useAction()
	const WebViewReference = useRef<WebView>(null)
	const { currentLocation: stateCurrentLocation } = useTypedSelector(
		state => state.reader
	)
	const {
		colorScheme,
		padding,
		lineHeight,
		flow,
		font,
		fontSize,
		lastBookLocations
	} = useTypedSelector(state => state.readingSettings)

	const onMessage = (event: WebViewMessageEvent) => {
		const parsedEvent = JSON.parse(event.nativeEvent.data) as WebviewMessage
		const { type } = parsedEvent

		if (type === 'onLocationChange') {
			const { currentLocation, progress } = parsedEvent
			if (
				stateCurrentLocation?.end.displayed.page ===
					currentLocation.end.displayed.page ||
				progress === 0
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
		<GestureHandlerRootView className='m-0 h-screen w-screen p-0 pb-4'>
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
						<TouchableWithoutFeedback onPress={handleDoublePress}>
							<WebView
								menuItems={[]}
								showsVerticalScrollIndicator={false}
								javaScriptEnabled
								source={{
									html: `
									<script>
									const body = document.querySelector('body')
								export 	const goToLocation = (string) => {
											body.scrollIntoView({
												behavior: 'smooth',
												block: 'end',
												inline: 'nearest'
											})
										}
</script>
   <style>
			body {
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
	}
   </style>
<body>
<p><a id="p6"></a></p><h2>Being struck speechless was a new experience for Kira, but then the man sitting across from her had a disturbing way of surprising her. </h2>
<p>Graydon rested his chin on his hand and raised his eyebrows at her in silent invitation. </p>
<p>He couldn't have said what she thought she’d heard. </p>
<p>"Would you like to repeat that?" Because it had sounded an awful lot like he'd said he was keeping her—which was absurd. </p>
<p>A fact he had to know. </p>
<p>Graydon smirked, a cocky twist of the lips that made her want to reach across the table and punch him. "Is your hearing bad?" </p>
<p>The man known as the Emperor's Face was built like a mountain. </p>
<p>Authority was stamped on every feature; arrogance along with it. The synth armor he wore seemed to eat the light, appearing a black so deep she was surprised she couldn't see her reflection in it. He was tall and broad-shouldered, with clearly delineated muscles even his armor couldn't hide. </p>
<p>His features warned of the stubborn personality inside even as they invited you to sit and stare a while. He was handsome, almost brutally so. </p>
<p>He knew it, too. Dark hair framed intense, stormy gray eyes and a face chiseled from granite. Thin lips that looked indescribably soft. </p>
<p>Yes, handsome if not for the fact smug superiority oozed from his pores. </p>
<p>Kira’s eyes narrowed. </p>
<p>Was this revenge? Some type of retaliation for hurt pride? </p>
<p>He'd asked her to stay, and she'd refused for reasons she couldn't reveal to him. Her mission was dangerous, requiring focus and sacrifice. Graydon was a temptation she couldn't afford. </p>
<p>She wouldn't have thought it of him. He was too self-assured for such petty things. </p>
<p>No, this was something else. </p>
<p>"Not at all," Kira said icily. "I just wanted to see if you’re really as stupid as you're acting." </p>
<p>Graydon's smile flashed again, an amused lion impressed by his prey's struggles. </p>
<p>She ignored him in favor of examining the rest of those taking part in this farce. Liara, the Overlord of House Luatha, sat to the right of Graydon, </p>
<p><a ></a>her eyes bruised and her features exhausted. The battle for the planet had taken its toll on Kira's cousin. </p>
<p>It would make a deceptively useful tactic. More so when it was used like it was now, as a bludgeon to try to force the outcome he wanted. </p>
<p>It might have worked had these people been human. Not so much with Tuann, who could do quietly-stubborn better than even Kira. She could</p>
<p><a ></a>already see the mood in the room shifting. Any gains Jace and the Curs, an elite squad who had accompanied her to Ta Da’an, had won during their actions against the Tsavitee invasion were rapidly disappearing. </p>
<p>The Tuann appreciated the fine art of subtlety. They were the sleek snake in the grass, not the boar driving its head mindlessly against the nearest obstacle. </p>
<p>Kira briefly considered interfering and saving Kent from himself, but why do that when he was being the perfect distraction. </p>
<p>"What are our options?" Kira stuck to Japanese as she lowered her voice so only Jin would hear. </p>
<p>Raider shifted beside her, leaning closer. </p>
<p>She'd prefer to have this conversation in private, but she doubted she would be afforded that privilege. </p>
<p>"Not many," Jin admitted. "They have you over a barrel. There is precedent. It's rare, but it's there." </p>
<p>Kira refocused. When they'd arrived on this planet—ostensibly to meet her mother’s people, House Luatha—Jin had gone through the Tuann laws</p>
<p>—those he could get his hands on. An informed Kira was a smart Kira. </p>
<p>They'd thought getting Liara to give up her family claim to Kira would be the end of things. Turned out that assumption was wrong because Kira was uncommon in the Tuann community. </p>
<p>Her parents weren't from one House but two, a marriage meant to cement an alliance between two foes. It left Kira in the rare position of being dual House. Since she’d been kidnapped before her parents could designate her as one House or the other, it meant both Houses had a claim. </p>
<p>And lucky Kira, she'd convinced Liara to rescind her claim, clearing the field nicely for Roake. </p>
<p>Kira rubbed her forehead. What a clusterfuck. </p>
<p>It wasn't Jin's fault he'd missed this. Neither one of them was familiar enough with Tuann culture to understand all of its nuances. It placed them in the unenviable position of having to feel their way through half-blind. </p>
<p>"We could run, but—" Jin trailed off. </p>
<p>Yes, but. </p>
<p>The Tsavitee were back. Humans would need all their allies. </p>
<p>She might have pulled away from humanity, needing the distance to heal while putting her long-term plans in motion, but she had no desire to see the Consortium fall. She cared for too many of them. </p>
<p><a ></a>Kira stared at the table, hating she'd been pushed to this point. Options were limited. There was no easy path forward; whichever way she turned, something would be lost. </p>
<p>Since she'd never formalized her retirement, it left her open to the military’s will. A will Himoto had already exercised once by ordering her to Ta Da'an, House Luatha’s planet. </p>
<p>As soon as Kent figured out what the Tuann really wanted, it'd happen again. </p>
<p>The only thing she was surprised about was that Himoto hadn't already acted. She lifted her eyes to meet his impenetrable stare. He'd never been easy to read with that stoic face. Age hadn't changed that much. </p>
<p>"I don't think you have a choice," Jin said, knowing where her mind had gone. </p>
<p>"I think you're right." She hated that it had come to this. Hated that she was going to have to shut a door she'd kept deliberately cracked. </p>
<p>"What are you about to do?" Raider asked, the lazy amusement on his face disappearing. </p>
<p>He'd known her long enough to know she wasn't going to let herself be caged. Not unless it was her will. </p>
<p>"Nothing I don't have to," Kira assured him. </p>
<p>Raider appeared less than reassured. But then, he knew her better than any of those present, except for Jin. Their history was long. Even if it was fraught with tension and soured with dislike toward the end, there had been a time where they'd been as close as siblings. </p>
<p>"I don't care if you have to tow the damn things," Kent was saying, his eyes snapping fire as he glared at Jace. "Just find a way to get them here." </p>
<p>"Admiral, we are happy to provide the people required to fly our ships to a human station of your choosing," Silas offered. </p>
<p>Silence reigned. Kent's gaze flicked from Silas to Jace to Kira and back again. "What are we talking about then?" </p>
<p>"There's a price for their cooperation," Kira said, finally stirring. </p>
<p>Kent stared at her. "Don't leave us in suspense." </p>
<p>"In exchange for our cooperation, we would like the Lady Kira to accompany us to our home," Silas said, inclining his head showing respect to Kira. </p>
<p>Kent was quiet for several seconds, his forehead furrowed as if he was trying to decipher whether there was a hidden message in there. "Let me see</p>
<p><a ></a>if I have this straight. You’ll give us the ships, people to operate the ships, and all you want is her?" </p>
<p>"We would like the opportunity for her to get to know us. This seems to be the only way to make it happen." Silas's smile was genial. </p>
<p>"More like keep her indefinitely," Jin muttered. </p>
<p>"Is that a drone?" Kent asked, squinting at her friend. "What is a drone doing giving its opinion in a situation like this? Is that even possible?" </p>
<p>Kira's hands tightened into fists, no longer finding the brash admiral quite so amusing. </p>
<p>Kent didn't wait for an answer, flicking his hand dismissively. "It doesn't matter. This problem is easily solved. Take her. Rear Admiral Skarsdale, please accompany those ships home." </p>
<p>"No." Kira's words ripped through the air, forestalling the admiral from flicking off his screen. </p>
<p>He frowned at her. "What do you mean no?" </p>
<p>Kira ignored him, focusing on Himoto. "You asked for ships. I got you ships. You asked me to free myself. I did. My debt is paid." </p>
<p>Himoto didn't speak as he regarded her thoughtfully. </p>
<p>"You don't get to say no," Kent said disdainfully. "You're a member of the Space Force. You serve at our needs, just like every other soldier." </p>
<p>"Jin." </p>
<p>"Already done," Jin said. </p>
<p>"What are you doing?" Jace asked, his attention swinging to Kira. </p>
<p>"What I have to," Kira said, not second-guessing herself. She focused on Kent again. "Regulation 5.63—any service member who has served their first two tours can put in a packet to end their service if they have not been called to a combat rotation for the preceding three years." </p>
<p>Raider made a choked sound. </p>
<p>Kira took a deep breath. Was she really doing this? Yes. Yes, she was. </p>
<p>She wouldn't bow to the dictates of someone like Kent. </p>
<p>This move was drastic, but it would give her room to maneuver. More importantly, it meant none of her actions beyond this point could be used against the Consortium. </p>
<p>"I won't be trapped again. I've defended humanity above and beyond what most ever hope to commit. I've sacrificed again and again. This was the last time." </p>
<p>"This won't work. That packet has to be hand-delivered," Kent warned. </p>
<p><a ></a>"Nothing in those regulations says it has to be done by the person submitting the packet." </p>
<p>Kira and Kent were locked in a staring match. Each daring the other to blink. Only this time, Kira didn't plan for it to be her. </p>
<p>"You're bluffing," he said finally. </p>
<p>"Tell me again how you order me to give up my freedom for a few ships that won't even protect you when the Tsavitee come," Kira dared. </p>
<p>Fury and stubbornness lit Kent's eyes. He was going to do it. He was going to force her hand. </p>
<p>"Kira, think. You can't take this back," Raider said urgently. </p>
<p>"It should have been done a long time ago," she said softly. "There's no going back. Only forward." </p>
<p>It hurt to break Kent's gaze and look at her longtime friend, sometimes enemy. </p>
<p>Jace was silent, frozen disbelief on his face. </p>
<p>"You wouldn't dare," Kent said. He didn't realize she was a wolf whose leg was caught in a trap, willing to chew it off. </p>
<p>A knock sounded from out of sight. </p>
<p>Himoto met her gaze, his lips twitching. "This is unexpected. Quite the element of surprise." </p>
<p>"I learned from the best." </p>
<p>His head dipped in a nod. "Come in." </p>
<p>Kira thought she saw momentary surprise flash across his face before he composed his expression. </p>
<p>Graydon shifted, the tension rolling off him drawing Kira's attention like a bee to honey. His eyes were fierce, his shoulders tense. </p>
<p>That's right. Breathe it in. She'd outmaneuvered him. </p>
<p>"I win," she mouthed. </p>
<p>His eyebrows snapped together. </p>
<p>"That doesn't mean anything," Kent tried. </p>
<p>"For someone of your position, you're not particularly smart," Jin said. </p>
<p>"The Tuann are sitting right here. What kind of people do you want them to think you are? The kind who would sacrifice your own people? The kind who lies for your own self-interests? You're not really presenting humans in a sympathetic light here." </p>
<p>"J1N, shut down," Kent snapped. "That's an order." </p>
<p>A chuckle rolled from Jin. "I don't take orders from you, meat sack." </p>
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
								onMessage={onMessage}
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
				</FlingGestureHandler>
			</FlingGestureHandler>
		</GestureHandlerRootView>
	)
}
