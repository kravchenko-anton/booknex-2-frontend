import ReadingSettings from '@/screens/reading/settings/sheet/reading/reading-settings'
import ReaderSearch from '@/screens/reading/settings/sheet/search/reader-search'
import type { FC } from 'react'

export enum BottomSheetListEnum {
	readingSettings = 'readingSettings',
	readerSearch = 'readerSearch'
}

export interface SheetType {
	name: keyof typeof BottomSheetListEnum
	component: FC
	background?: string
}
export const BottomSheetList: SheetType[] = [
	{
		name: BottomSheetListEnum.readingSettings,
		component: ReadingSettings
	},
	{
		name: BottomSheetListEnum.readerSearch,
		component: ReaderSearch
	}
]
