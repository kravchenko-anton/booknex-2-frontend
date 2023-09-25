import { Octicons } from '@expo/vector-icons'

export interface FeatureProps {
	iconName: keyof typeof Octicons.glyphMap
	iconTitle: string | number
	iconDescription: string
}
