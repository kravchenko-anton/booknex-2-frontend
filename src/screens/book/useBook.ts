import { useToggle } from '@/hooks/useToggle/useToggle'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { bookService } from '@/services/book-service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Share } from 'react-native'

export const useBook = () => {
	const { navigate: navigateFunction } = useTypedNavigation()
	const { params } = useTypedRoute<'Book'>()
	const { data: book } = useQuery(['book ', params.id], () =>
		bookService.byId(+params.id)
	)
	const { handleToggle: toggleReadingBooks, isSmashed: isSmashedReadingBooks } =
		useToggle(
			{
				type: 'readingBooks',
				id: params.id
			},
			['library']
		)

	const hamburgerMenuElements = [
		// TODO: доделать список
		{
			title: 'Share',
			onPress: () => {
				Share.share({
					message: `Wow! I see ${
						book?.title || 'amazing'
					} book on Booknex and I think you will like it too!`
				})
			}
		},
		{
			title: 'Report problem',
			onPress: () => {
				console.log('Report problem')
			}
		},
		{
			title: 'Write review',
			onPress: () => {
				console.log('Write review')
			}
		},
		{
			title: isSmashedReadingBooks
				? 'Remove from reading list'
				: 'Add to reading list',
			onPress: () => toggleReadingBooks()
		}
	]

	const navigate = {
		reading: () => {
			navigateFunction('Reading', { id: params.id })
		},
		genre: (id: number) => {
			navigateFunction('Genre', { id })
		},
		similar: (id: number) => {
			navigateFunction('Book', { id })
		},
		author: (id: number) => {
			navigateFunction('Author', { id })
		}
	}

	return useMemo(
		() => ({
			book,
			navigate,
			hamburgerMenuElements,
			toggleReadingBooks,
			isSmashedReadingBooks
		}),
		[book, toggleReadingBooks, isSmashedReadingBooks]
	)
}
