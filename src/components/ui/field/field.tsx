import { Title } from '@/components/ui/title/title'
import { fontSettings } from '@/components/ui/title/title-settings'
import { Color } from '@/utils/color'
import { Controller, Path, PathValue } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { FieldProperties } from './filed-types'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Field = <T extends Record<string, any>>({
	...properties
}: FieldProperties<T>): JSX.Element | null => {
	return (
		<Controller
			control={properties.control}
			name={properties.name}
			rules={properties.rules}
			defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error }
			}) => (
				<>
					<View
						style={{
							borderColor: error ? Color.alert : Color.secondary,
							backgroundColor: Color.dust
						}}
						className='my-1.5 w-full rounded-lg border-[1px] px-4 pb-4 pt-2.5'>
						<TextInput
							autoCapitalize='none'
							onBlur={onBlur}
							onChangeText={onChange}
							keyboardAppearance='default'
							renderToHardwareTextureAndroid={true}
							placeholderTextColor={Color.secondary}
							defaultValue={properties.defaultValue}
							value={(value ?? '').toString()}
							className='text-base text-secondary'
							style={{
								fontFamily: fontSettings.bold
							}}
							{...properties}
						/>
					</View>
					{error && (
						<Title color={Color.alert} size={16}>
							{error.message ?? 'error!'}
						</Title>
					)}
				</>
			)}
		/>
	)
}

export default Field
