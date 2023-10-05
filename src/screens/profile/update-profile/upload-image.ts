import { uploadService } from '@/services/upload-service'
import { userServices } from '@/services/user-service'
import { errorCatch } from '@/utils/catch-error'
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
	console.log(result.assets)
	return result.assets ? result.assets[0] : undefined
}

export const useUploadUserPicture = (oldPicture?: string) => {
	const queryClient = useQueryClient()

	const uploadUserPicture = async () => {
		const image = await selectImage()
		if (!image) return

		const file = await fetch(image.uri).then(response => response.blob())

		if (oldPicture) {
			const { data } = useMutation(
				['upload user picture'],
				() => uploadService.replacement(file, oldPicture, 'user-pictures'),
				{
					onError: error => {
						Toast.show({
							text1: 'Upload picture',
							text2: errorCatch(error),
							type: 'error'
						})
					},
					onSuccess: () => {
						if (!data) return
						useMutation(['update user picture'], () =>
							userServices.updatePicture(data.name)
						)
						queryClient.invalidateQueries(['user-profile'])
					}
				}
			)
		} else {
			const { data } = useMutation(
				['upload user picture'],
				() => uploadService.upload(file, 'user-pictures'),
				{
					onError: error => {
						Toast.show({
							text1: 'Update profile',
							text2: errorCatch(error),
							type: 'error'
						})
					},
					onSuccess: () => {
						if (!data) return
						useMutation(['update user picture'], () =>
							userServices.updatePicture(data.name)
						)
						queryClient.invalidateQueries(['user-profile'])
					}
				}
			)
		}
	}

	const toggleUserPicture = async () => {
		await uploadUserPicture()
	}
	return { toggleUserPicture }
}
