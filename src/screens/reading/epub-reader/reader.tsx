import BigLoader from '@/components/ui/loader/big-loader'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { defaultTheme } from '@/redux/epub-reader-slice/epub-reader-slice'
import { useFileSystem } from '@/screens/reading/epub-reader/hooks/useFileSystem/useFileSystem'
import * as FileSystem from 'expo-file-system'
import React, { useEffect, useState } from 'react'
import { useInjectWebVieWVariables } from './hooks/useInjectWebviewVariables'
import epubjs from './liblaries/epubjs'
import jszip from './liblaries/jszip'
import type { ReaderProperties } from './types'
import { SourceType } from './types'
import { getSourceName } from './utils/getPathname'
import { getSourceType } from './utils/getSourceType'
import { isFsUri } from './utils/isFsUri'
import { isURL } from './utils/isURL'
import { View } from './view'

export function Reader({
	src,
	width,
	flow,
	height,
	initialLocations,
	...rest
}: ReaderProperties) {
	const { downloadFile } = useFileSystem()

	const { setIsLoading } = useAction()
	const { isLoading } = useTypedSelector(state => state.reader)
	const { injectWebVieWVariables } = useInjectWebVieWVariables()
	const [template, setTemplate] = useState<string | null>(null)
	const [templateUrl, setTemplateUrl] = useState<string | null>(null)
	const [allowedUris, setAllowedUris] = useState<string | null>(null)

	useEffect(() => {
		;(async () => {
			setIsLoading(true)

			const jszipFileUri = `${FileSystem.documentDirectory}jszip.min.js`
			const epubjsFileUri = `${FileSystem.documentDirectory}epub.min.js`

			try {
				await FileSystem.writeAsStringAsync(jszipFileUri, jszip)
			} catch {
				throw new Error('failed to write jszip js file')
			}

			try {
				await FileSystem.writeAsStringAsync(epubjsFileUri, epubjs)
			} catch {
				throw new Error('failed to write epubjs js file')
			}

			setAllowedUris(`${jszipFileUri},${epubjsFileUri}`)

			if (src) {
				const sourceType = getSourceType(src)
				const isExternalSource = isURL(src)
				const isSourceInFs = isFsUri(src)

				if (!sourceType) {
					throw new Error(`Invalid source type: ${src}`)
				}

				if (!isExternalSource) {
					if (isSourceInFs) {
						setAllowedUris(`${src}${jszipFileUri},${epubjsFileUri}`)
					}
					if (sourceType === SourceType.BASE64) {
						setTemplate(
							injectWebVieWVariables({
								jszip: jszipFileUri,
								epubjs: epubjsFileUri,
								type: SourceType.BASE64,
								book: src,
								flow,
								theme: defaultTheme,
								locations: initialLocations,
								enableSelection: true
							})
						)

						setIsLoading(false)
					} else {
						setTemplate(
							injectWebVieWVariables({
								jszip: jszipFileUri,
								epubjs: epubjsFileUri,
								type: SourceType.BINARY,
								book: src,
								flow,
								theme: defaultTheme,
								locations: initialLocations,
								enableSelection: true
							})
						)

						setIsLoading(false)
					}
				}

				if (isExternalSource) {
					const sourceName = getSourceName(src)

					if (!sourceName) {
						throw new Error(`Invalid source name: ${src}`)
					}

					if (sourceType === SourceType.OPF || sourceType === SourceType.EPUB) {
						setTemplate(
							injectWebVieWVariables({
								jszip: jszipFileUri,
								epubjs: epubjsFileUri,
								type: sourceType,
								book: src,
								flow,
								theme: defaultTheme,
								locations: initialLocations,
								enableSelection: true
							})
						)

						setIsLoading(false)
					} else {
						const { uri: bookFileUri } = await downloadFile(src, sourceName)

						if (!bookFileUri) throw new Error("Couldn't download book")

						setAllowedUris(`${bookFileUri},${jszipFileUri},${epubjsFileUri}`)

						setTemplate(
							injectWebVieWVariables({
								jszip: jszipFileUri,
								epubjs: epubjsFileUri,
								type: sourceType,
								book: bookFileUri,
								flow,
								theme: defaultTheme,
								locations: initialLocations,
								enableSelection: true
							})
						)

						setIsLoading(false)
					}
				}
			}
		})()
	}, [
		defaultTheme,
		downloadFile,
		initialLocations,
		injectWebVieWVariables,
		src,
		flow
	])

	useEffect(() => {
		const saveTemplateFileToDocument = async () => {
			try {
				if (template) {
					const content = template

					const fileUri = `${FileSystem.documentDirectory}index.html`
					await FileSystem.writeAsStringAsync(fileUri, content)
					setTemplateUrl(fileUri)
				}
			} catch {
				throw new Error('Error saving index.html file:')
			}
		}
		if (template) {
			saveTemplateFileToDocument()
		}
	}, [template])

	if (isLoading || !templateUrl || !allowedUris) {
		return <BigLoader />
	}
	console.log('render')
	// TODO: сделать меньше рендеров
	return (
		<View
			templateUri={templateUrl}
			allowedUris={allowedUris}
			width={width}
			flow={flow}
			height={height}
			{...rest}
		/>
	)
}
