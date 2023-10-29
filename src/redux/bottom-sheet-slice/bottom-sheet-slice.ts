import { createSlice } from '@reduxjs/toolkit'
// TODO: сделать слайс
const initialState = {}

const BottomSheetSlice = createSlice({
	name: 'Bottom-sheet',
	initialState,
	reducers: {}
})

export const { reducer: BottomSheetReducer, actions: BottomSheetAction } =
	BottomSheetSlice
