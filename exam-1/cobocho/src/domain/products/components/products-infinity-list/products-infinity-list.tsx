import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import InfinityScroll from '@/components/infinity-scroll/infinity-scroll';
import { productsQuery } from '../../api/products.query';
import type { ProductsRequest } from '../../api/products.types';
import { ProductCard } from '../product-card/product-card';

interface ProductsInfinityListProps {
	filters: ProductsRequest;
}

export const ProductsInfinityList = ({
	filters,
}: ProductsInfinityListProps) => {
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
	} = useInfiniteQuery(productsQuery.getInfiniteProductsQueryOptions(filters));

	useEffect(() => {
		if (isError) {
			toast.error(error.message);
		}
	}, [isError, error]);

	const handleFetchMore = useCallback(async () => {
		await fetchNextPage();
	}, [fetchNextPage]);

	const products = data?.pages.flatMap((page) => page.products) ?? [];

	const isBlank = !isError && !isLoading && products.length === 0;

	return (
		<InfinityScroll
			onFetchMore={handleFetchMore}
			error={isError}
			disabled={!hasNextPage || isError || isBlank}
			loading={isFetchingNextPage}
		>
			<div className="grid grid-cols-2 gap-4">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
			</div>
			{isBlank && <p>검색 결과가 없습니다.</p>}
		</InfinityScroll>
	);
};
