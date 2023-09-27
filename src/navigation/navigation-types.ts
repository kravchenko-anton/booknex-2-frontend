import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Featured: undefined
	Profile: undefined
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
	name: keyof TypeRootStackParamList
	component: ComponentType
	isAdmin?: boolean
}
