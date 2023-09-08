import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Auth: undefined
	Home: undefined
	Profile: undefined
	Reading: undefined
	Book: undefined
	Catalog: undefined
	Settings: undefined
	Search: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
	isAdmin?: boolean
}
