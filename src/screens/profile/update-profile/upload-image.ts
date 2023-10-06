import { uploadService } from '@/services/upload-service'
import { userServices } from '@/services/user-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-toast-message'

export const selectImage = async () => {
	const result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [1, 1],
		quality: 1
	})
	if (result.canceled) {
		Toast.show({
			type: 'error',
			text1: 'Error',
			text2: 'Image picker was cancelled'
		})
	}
	return result.assets ? result.assets[0] : undefined
}

export const useUploadUserPicture = (oldPicture?: string) => {
	const QueryClient = useQueryClient()
	const { mutateAsync: UserPictureUpdateMutateAsync } = useMutation(
		['save user picture'],
		(fileName: string) => userServices.updatePicture(fileName)
	)
	const { mutateAsync: UploadPictureMutateSync } = useMutation(
		['upload picture'],
		(formData: FormData) =>
			oldPicture && oldPicture.startsWith('user-pictures')
				? uploadService.replacement(formData)
				: uploadService.upload(formData, 'user-pictures'),
		{
			onError: error => {
				console.log(error, 'onError')
				Toast.show({
					text1: 'Update profile',
					text2: 'An error occurred',
					type: 'error'
				})
			},
			onSuccess: async data => {
				console.log('onSuccess')
				if (!data) return
				console.log(data, 'onSuccess')

				await UserPictureUpdateMutateAsync(data.name)
				await QueryClient.invalidateQueries(['user-profile'])
			}
		}
	)

	const onSubmit = async () => {
		const image = await selectImage()
		if (!image) return
		const formData = new FormData()
		formData.append('file', {
			uri: image.uri,
			name:
				image.uri.slice(image.uri.lastIndexOf('/') + 1, image.uri.length) ??
				`${
					Math.random().toString(36).slice(2, 15) +
					Math.random().toString(36).slice(2, 15)
				}.jpg`,
			type: 'application/octet-stream'
		} as unknown as Blob)

		if (oldPicture && oldPicture.startsWith('user-pictures')) {
			formData.append('deleteFilename', oldPicture)
			formData.append('folder', 'user-pictures')
		}
		await UploadPictureMutateSync(formData)
	}

	return { onSubmit }
}
