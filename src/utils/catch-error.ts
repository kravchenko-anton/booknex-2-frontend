export const errorCatch = (error: any): string => {
	if (typeof error === 'string') return error
	const message = error?.response?.data?.message

	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message
}
