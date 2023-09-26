import type { ViewDefaultProps } from '@/types/component-types'
import type { WrapperProps } from '@/types/global'
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
			'onChange' | 'onChangeText' | 'value' | 'testID'
		>,
		WrapperProps<ViewDefaultProps['style']> {
	control: Control<T>
	name: FieldPath<T>
	keyboardType?: KeyboardTypeOptions
	rules?: Omit<
		RegisterOptions<T, FieldPath<T>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>
}
