import Button from '@/components/ui/button/button'
import Image from '@/components/ui/image/image'
import { UpdatePictureProperties } from '@/screens/profile/update-profile/update-picture/update-picture-types'
import { useUploadUserPicture } from '@/screens/profile/update-profile/update-picture/useUploadPicture'
import { Color } from '@/utils/color'
import { shadeRGBColor } from '@/utils/shade-color'
import { FC } from 'react'
import { View } from 'react-native'

const UpdatePicture: FC<UpdatePictureProperties> = ({ picture }) => {
	const { onSubmit } = useUploadUserPicture(picture)
	return (
		<View className='mt-8 w-full items-center'>
			<View
				style={{ backgroundColor: shadeRGBColor(Color.gray, -70) }}
				className='z-50 rounded-2xl p-3'>
				<Image className='p-4' height={120} width={120} url={picture} />
			</View>

			<View className=' w-full px-4 pb-2'>
				<Button
					className='mt-4 w-full'
					variant={'primary'}
					onPress={() => {
						onSubmit()
					}}
					size={'medium'}
					text={'Change photo'}
				/>
			</View>
		</View>
	)
}

export default UpdatePicture