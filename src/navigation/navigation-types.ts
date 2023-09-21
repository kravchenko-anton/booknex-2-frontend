import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Home: undefined
	Profile: undefined
	Reading: undefined
	Book: undefined
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
