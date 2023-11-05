import ReadingSettings from '@/screens/reading/settings/sheet/reading/reading-settings'
import ReaderSearch from '@/screens/reading/settings/sheet/search/reader-search'
import SelectTheme from '@/screens/reading/settings/sheet/select-theme/select-theme'
import type { FC } from 'react'

export enum BottomSheetListEnum {
	readingSettings = 'readingSettings',
	readerSearch = 'readerSearch',
	selectTheme = 'selectTheme'
}

export interface SheetType {
	name: keyof typeof BottomSheetListEnum
	component: FC
}
export const BottomSheetList: SheetType[] = [
	{
		name: BottomSheetListEnum.readingSettings,
		component: ReadingSettings
	},
	{
		name: BottomSheetListEnum.readerSearch,
		component: ReaderSearch
	},
	{
		name: BottomSheetListEnum.selectTheme,
		component: SelectTheme
	}
]
