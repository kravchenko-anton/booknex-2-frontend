import { UserLibraryFieldsType } from '@/services/types/user-services-types'

export interface UseToggleProperties {
	type: keyof UserLibraryFieldsType
	id: number
}
