import { BookCardProperties } from '@/components/book-card/book-card-types'
import { PressableDefaultProperties } from '@/types/component-types'

export interface VerticalBookCardProperties
	extends PressableDefaultProperties,
		Omit<BookCardProperties, 'image'> {
	coverUrl: string
}
