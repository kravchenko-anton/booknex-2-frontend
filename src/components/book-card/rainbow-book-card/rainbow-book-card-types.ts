import { BookCardProps } from '@/components/book-card/book-card-types'
import { ViewDefaultProps } from '@/types/component-types'

export interface RainbowBookCardProps
	extends ViewDefaultProps,
		Pick<BookCardProps, 'image'> {
	title: string
	description: string
	backgroundColor: string
}
