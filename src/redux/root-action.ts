import { alertAction } from '@/redux/alert/alert-slice'
import * as authActions from '../redux/auth/auth-action'

export const rootAction = {
	...authActions,
	...alertAction
}
