import { useTypedRoute } from '@/hooks/useTypedRoute'

// TODO: сделать после деплоя бекенда, полного каталога, запуска на свой телефон и реализации обновления чтобы понять где будут с меня стягивать деньги
const Reading = () => {
	const { params } = useTypedRoute<'Reading'>()

	return (
		<Epub
			src={'https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf'}
			flow={'paginated'}
		/>
	)
}

export default Reading
