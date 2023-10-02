import { Octicons } from '@expo/vector-icons'

export interface FeatureProperties {
	iconName: keyof typeof Octicons.glyphMap
	iconTitle: string | number
	iconDescription: string
}
