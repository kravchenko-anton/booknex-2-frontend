import type { UserLibraryFieldsType } from '@/services/types/user-services-types'
import type { ComponentType } from 'react'

export type TypeRootStackParameterList = {
	Author: { id: number },
	Book: { id: number },
	ComprehensiveList: {
		type: keyof UserLibraryFieldsType
	},
	Featured: undefined,

	Genre: { id: number },
	Library: undefined
	Login: { defaultEmail: string },
	Profile: undefined,
	Reading: { id: number },
	Registration: { defaultEmail: string },
	Search: undefined
	Settings: undefined,

	Shelf: { id: number },
	Statistic: undefined,
	UpdateProfile: undefined,

	Welcome: undefined
}

export interface IRoute {
	component: ComponentType,
	isAdmin?: boolean,
	name: keyof TypeRootStackParameterList
}
