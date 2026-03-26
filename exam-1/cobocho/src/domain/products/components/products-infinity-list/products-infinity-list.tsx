import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import InfinityScroll from '@/components/infinity-scroll/infinity-scroll';
import { Grid } from '@/components/layout';
import { VStack } from '@/components/layout';
import { productsQuery } from '../../api/products.query';
import type { ProductsRequest } from '../../api/products.types';
import { ProductCard } from '../product-card/product-card';
import { InternalServerError, ServiceUnavailableError } from '@/libs/errors';

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

	useEffect(
		function handleProductFetchError() {
			if (
				error instanceof InternalServerError ||
				error instanceof ServiceUnavailableError
			) {
				toast.error(error.message);
			}
		},
		[error],
	);

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
			<Grid
				columns={2}
				gap={4}
			>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
			</Grid>
			{isBlank && (
				<VStack
					align="center"
					className="py-12 text-gray-400"
				>
					<p>검색 결과가 없습니다.</p>
				</VStack>
			)}
		</InfinityScroll>
	);
};
