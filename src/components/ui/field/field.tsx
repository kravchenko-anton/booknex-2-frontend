import { Title } from '@/components/ui/title/title'
import { Color } from '@/utils/color'
import { Controller, Path, PathValue } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { FieldProps } from './filed.types'

const Field = <T extends Record<string, any>>({
	...props
}: FieldProps<T>): JSX.Element | null => {
	return (
		<View style={props.wrapperStyle} className={props.wrapperClassName}>
			<Controller
				control={props.control}
				name={props.name}
				rules={props.rules}
				defaultValue={props.defaultValue as PathValue<T, Path<T>>}
				render={({
					field: { value, onChange, onBlur },
					fieldState: { error }
				}) => (
					<>
						<View
							style={{
								borderWidth: 1,
								borderColor: error ? Color.alert : Color.secondary,
								backgroundColor: Color.dust
							}}
							className='my-1.5 w-full rounded-lg px-4 pb-4 pt-2.5'>
							<TextInput
								autoCapitalize='none'
								onBlur={onBlur}
								onChangeText={onChange}
								keyboardAppearance='default'
								renderToHardwareTextureAndroid={true}
								placeholderTextColor={Color.secondary}
								defaultValue={props.defaultValue}
								value={(value ? value : '').toString()}
								className='text-base text-secondary'
								style={{
									fontFamily: 'SpaceGrotesk_700Bold'
								}}
								{...props}
							/>
						</View>
						{error && (
							<Title color={Color.alert} size={16}>
								{error.message ? error.message : 'error!'}
							</Title>
						)}
					</>
				)}
			/>
		</View>
	)
}

export default Field
