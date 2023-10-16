import { VerticalBookCardProperties } from '@/components/book-card/vertical-book-card/vertical-book-card-types'
import Button from '@/components/ui/button/button'
import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { Pressable, View } from 'react-native'

const VerticalBookCard: FC<VerticalBookCardProperties> = ({ ...book }) => {
	return (
		<Pressable
			className=' h-[185px] w-full  flex-row rounded-lg bg-dust p-2'
			{...book}>
			<Image url={book.coverUrl} height={140} fullSize={true} width={115} />
			<View className='h-[170px] flex-1 p-3 pb-0'>
				<View>
					<Title size={22} weight='bold' numberOfLines={2}>
						{book.title}
					</Title>
					<Title
						size={16}
						weight='light'
						className='mb-2 mt-1'
						color={Color.gray}>
						{book.author}
					</Title>
				</View>
				<View className='flex-row items-center gap-2'>
					{book.likedPercentage && (
						<Button
							variant={'ghost'}
							size={'small'}
							text={`👍 ${book.likedPercentage}% liked`}
						/>
					)}
					{book.pages && (
						<Button
							variant={'ghost'}
							size={'small'}
							text={`📖 ${book.pages} pages`}
						/>
					)}
				</View>
			</View>
		</Pressable>
	)
}

export default VerticalBookCard
