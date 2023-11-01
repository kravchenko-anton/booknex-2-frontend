import type {
	BottomSheetListEnum,
	SheetType
} from '@/components/ui/bottom-sheet/bottom-sheet-list'
import { BottomSheetList } from '@/components/ui/bottom-sheet/bottom-sheet-list'
import { Color } from '@/utils/color'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
// TODO: сделать слайс
const initialState = {
	bottomSheet: null as null | SheetType
}

const BottomSheetSlice = createSlice({
	name: 'bottom-sheet',
	initialState,
	reducers: {
		openBottomSheet(
			state,
			action: PayloadAction<
				[keyof typeof BottomSheetListEnum, { background?: string }]
			>
		) {
			const [name, { background }] = action.payload
			state.bottomSheet = {
				...BottomSheetList.find(sheet => sheet.name === name),
				background: background ?? Color.dust
			} as SheetType
		},
		closeBottomSheet(state) {
			state.bottomSheet = null
		}
	}
})

export const { reducer: BottomSheetReducer, actions: BottomSheetAction } =
	BottomSheetSlice
