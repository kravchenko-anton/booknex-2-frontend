import Icon from '@/components/ui/icon/icon'
import { fontSettings } from '@/components/ui/title/title-settings'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import RnToast, { BaseToast } from 'react-native-toast-message'

const options = () => ({
	style: {
		backgroundColor: Color.white,
		borderLeftColor: Color.white
	},
	text1Style: {
		color: Color.black,
		fontSize: 16,
		marginLeft: -12,
		fontFamily: fontSettings.light
	},
	text2Style: {
		fontSize: 12,
		marginLeft: -12,

		color: Color.gray,
		fontFamily: fontSettings.light
	}
})

const Toast: FC = () => {
	return (
		<RnToast
			autoHide={true}
			visibilityTime={3000}
			position={'top'}
			config={{
				success: properties => (
					<BaseToast
						renderTrailingIcon={() => (
							<Icon
								noPadding
								color={Color.primary}
								name={'thumbsup'}
								className='mr-4'
								size={'large'}
							/>
						)}
						{...properties}
						{...options()}
					/>
				),
				info: properties => (
					<BaseToast
						renderTrailingIcon={() => (
							<Icon
								noPadding
								color={Color.highlight}
								name={'alert'}
								className='mr-4'
								size={'large'}
							/>
						)}
						{...properties}
						{...options()}
					/>
				),
				error: properties => (
					<BaseToast
						renderTrailingIcon={() => (
							<Icon
								noPadding
								color={Color.alert}
								name={'thumbsdown'}
								className='mr-4'
								size={'large'}
							/>
						)}
						{...properties}
						{...options()}
					/>
				)
			}}
		/>
	)
}

export default Toast
