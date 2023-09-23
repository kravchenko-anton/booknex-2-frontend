import { BookCardProps } from '@/components/book-card/book-card-types'
import { PressableDefaultProps } from '@/types/component-types'

export interface RainbowBookCardProps
	extends PressableDefaultProps,
		Pick<BookCardProps, 'image'> {
	title: string
	description: string
	backgroundColor: string
}
