import type { ViewDefaultProps } from '@/types/component-types'

export interface TabsProps extends ViewDefaultProps {
	routes: { key: string; title: string; component: JSX.Element }[]
}
