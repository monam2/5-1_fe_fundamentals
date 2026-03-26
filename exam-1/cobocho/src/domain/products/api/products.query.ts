import { infiniteQueryOptions, keepPreviousData } from '@tanstack/react-query';
import { productsService } from './products.service';
import type { AutoCompleteRequest, ProductsRequest } from './products.types';

export const productsQuery = {
	all: () => ['products'] as const,
	lists: () => [...productsQuery.all(), 'lists'] as const,
	getInfiniteProductsQueryOptions: (params: Omit<ProductsRequest, 'page'>) =>
		infiniteQueryOptions({
			queryKey: [...productsQuery.lists(), params],
			queryFn: ({ pageParam }) =>
				productsService.getProducts({ ...params, page: pageParam }),
			initialPageParam: 1,
			getNextPageParam: (lastPage) =>
				lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 10,
			retry: 1,
			placeholderData: keepPreviousData,
		}),
	getAutoCompleteQueryOptions: (params: AutoCompleteRequest) => ({
		queryKey: [...productsQuery.all(), 'autoComplete', params],
		queryFn: () => productsService.getAutoComplete(params),
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10,
	}),
};
