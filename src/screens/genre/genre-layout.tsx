import HeaderScrollLayout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import { FC, PropsWithChildren } from 'react'

const GenreLayout: FC<
	PropsWithChildren<{ title: string; transientValue: number }>
> = ({ children, ...properties }) => {
	return (
		<HeaderScrollLayout
			header={{
				right: {
					title: properties.title
				}
			}}
			animatedHeader={properties}>
			{children}
		</HeaderScrollLayout>
	)
}

export default GenreLayout
