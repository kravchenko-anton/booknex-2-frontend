import { alertAction } from '@/redux/alert/alert-slice'
import { readingUiAction } from '@/redux/reading-settings/reading-ui-slice'
import * as authActions from '../redux/auth/auth-action'

export const rootAction = {
	...authActions,
	...alertAction,
	...readingUiAction
}
