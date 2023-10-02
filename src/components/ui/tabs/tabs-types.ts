import type { ViewDefaultProperties } from '@/types/component-types'

export interface Route {
	key: string
	title: string
	component: JSX.Element
}
export interface TabsProperties extends ViewDefaultProperties {
	routes: Route[]
}
