import { IconProperties } from '@/components/ui/icon/icon-types'
import { useToggle } from '@/hooks/useToggle/useToggle'
import { BookLayoutSettingsProperties } from '@/screens/book/book-layout/book-layout-types'
import { Share } from 'react-native'

export const useBookLayoutSettings = ({
	id,
	title,
	pages,
	likedPercentage
}: BookLayoutSettingsProperties) => {
	const { handleToggle: toggleReadingBooks, isSmashed: isSmashedReadingBooks } =
		useToggle({
			type: 'readingBooks',
			id: id
		})

	const hamburgerMenuElements = [
		{
			title: 'Share',
			onPress: () => {
				Share.share({
					message: `Wow! I see ${title} book on Booknex and I think you will like it too!`
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
			onPress: () => {
				toggleReadingBooks()
			}
		}
	]

	const statistics = [
		{
			title: 'Duration',
			count: `${Math.round(pages / 1.5 / 60)}h ${Math.round(
				(pages / 1.5) % 60
			)} min`,
			icon: 'clock'
		},
		{
			title: 'Pages',
			count: pages,
			icon: 'book'
		},
		{
			title: 'Liked',
			count: `${likedPercentage}%`,
			icon: 'thumbsup'
		}
	] as {
		title: string
		count: string | number
		icon: IconProperties['name']
	}[]
	const shareFunction = () =>
		Share.share({
			message: `Wow! I see ${title} book on Booknex and I think you will like it too!`
		})

	return {
		toggleReadingBooks,
		isSmashedReadingBooks,
		hamburgerMenuElements,
		shareFunction,
		statistics
	}
}
