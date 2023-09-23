import { useSearchForm } from '@/screens/search/useSearchForm'
import { catalogService } from '@/services/catalog-service'
import { useQuery } from '@tanstack/react-query'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control } = useSearchForm()

	const { data: books, isLoading } = useQuery(
		['search movies', debouncedSearch],
		() => catalogService.search(debouncedSearch),
		{
			enabled: !!debouncedSearch
		}
	)

	return { books, isLoading, control, searchTerm }
}
