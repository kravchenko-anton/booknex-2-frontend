import { ComponentType } from 'react'

export type TypeRootStackParameterList = {
	Featured: undefined
	Profile: undefined
	UpdateProfile: undefined
	Reading: undefined
	Library: undefined
	Book: { id: number }
	Settings: undefined
	Search: undefined
	Genre: { id: number }

	Welcome: undefined
	Login: { defaultEmail: string }
	Registration: { defaultEmail: string }

	Statistic: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParameterList
	component: ComponentType
	isAdmin?: boolean
}
