import { ShortBookType } from '@/services/types/book-service-types'
import { DefaultModelFields } from '@/types/global'

export interface AuthorType extends DefaultModelFields {
	name: string
	picture: string
	description: string
	color: string
	books: ShortBookType[]
}

export type ShortAuthorType = Pick<
	AuthorType,
	'name' | 'id' | 'createdAt' | 'updatedAt'
>
