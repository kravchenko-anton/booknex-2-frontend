import {
	Control,
	FieldPath,
	FieldValues,
	RegisterOptions
} from 'react-hook-form'
import { KeyboardTypeOptions, TextInputProps } from 'react-native'

export interface FieldProperties<T extends FieldValues>
	extends Omit<
		TextInputProps,
		'onChange' | 'onChangeText' | 'value' | 'testID'
	> {
	control: Control<T>
	name: FieldPath<T>
	keyboardType?: KeyboardTypeOptions
	rules?: Omit<
		RegisterOptions<T, FieldPath<T>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>
}
