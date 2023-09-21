import { Dispatch, SetStateAction } from 'react'

export interface WelcomeElementProps {
	isCheckEmailModal: boolean
	setIsCheckEmailModal: Dispatch<SetStateAction<boolean>>
}
