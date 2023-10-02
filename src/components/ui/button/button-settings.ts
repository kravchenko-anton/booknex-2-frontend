import { Color } from '@/utils/color'

export const BackgroundColor = {
	primary: Color.primary,
	secondary: Color.secondary,
	ghost: Color.white,
	dust: Color.dust,
	pale: Color.pale
}

export const disableOpacity = {
	true: 0.7,
	false: 1
}

export const TextColor = {
	primary: Color.white,
	secondary: Color.white,
	ghost: Color.black,
	dust: Color.black,
	pale: Color.black
}

export const TextWeight = {
	small: 'medium' as const,
	medium: 'semiBold' as const,
	large: 'bold' as const
}

export const TextSize = {
	small: 16,
	medium: 20,
	large: 24
}
