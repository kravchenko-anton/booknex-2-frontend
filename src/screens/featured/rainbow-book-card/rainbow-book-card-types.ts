import { BookCardProperties } from '@/components/book-card/book-card-types'
import { PressableDefaultProperties } from '@/types/component-types'

export interface RainbowBookCardProperties
	extends PressableDefaultProperties,
		Pick<BookCardProperties, 'image'> {
	title: string
	description: string
	backgroundColor: string
}
