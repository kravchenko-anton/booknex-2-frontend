import ReadingSettings from '@/screens/reading/settings/sheet/reading/reading-settings'
import ReaderSearch from '@/screens/reading/settings/sheet/search/reader-search'
import SelectTheme from '@/screens/reading/settings/sheet/select-theme/select-theme'
import type { FC } from 'react'

// TODO: разделить на страницы
export enum BottomSheetListEnum {
	readerSettings = 'reader/settings',
	readerSearch = 'reader/Search',
	readerNoteBook = 'reader/NoteBook',
	readerChapters = 'reader/Chapters',
	readerSelectTheme = 'reader/Select-theme'
}

export interface SheetType {
	name: BottomSheetListEnum
	component: FC
}
export const BottomSheetList: SheetType[] = [
	{
		name: BottomSheetListEnum.readerSettings,
		component: ReadingSettings
	},
	{
		name: BottomSheetListEnum.readerSearch,
		component: ReaderSearch
	},
	{
		name: BottomSheetListEnum.readerSelectTheme,
		component: SelectTheme
	}
]
