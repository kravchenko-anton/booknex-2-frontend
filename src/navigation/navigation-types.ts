import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Featured: undefined
	Profile: undefined
	Reading: undefined
	Library: undefined
	Book: { id: number }
	Catalog: undefined
	Settings: undefined
	Search: undefined
	Welcome: undefined
	Login: { defaultEmail: string }
	Registration: { defaultEmail: string }
}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
	isAdmin?: boolean
}
