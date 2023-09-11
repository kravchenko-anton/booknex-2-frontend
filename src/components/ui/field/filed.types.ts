import { UViewProps } from '@/types/component-types'
import { WrapperProps } from '@/types/global'
import {
	Control,
	FieldPath,
	FieldValues,
	RegisterOptions
} from 'react-hook-form'
import { KeyboardTypeOptions, TextInputProps } from 'react-native'

export interface FieldProps<T extends FieldValues>
	extends Omit<
			TextInputProps,
			'onChange' | 'onChangeText' | 'value' | 'placeholder' | 'testID'
		>,
		WrapperProps<UViewProps['style']> {
	control: Control<T>
	name: FieldPath<T>
	keyboardType?: KeyboardTypeOptions
	placeholder: string
	rules?: Omit<
		RegisterOptions<T, FieldPath<T>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>
}
