import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
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
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
	} = useInfiniteQuery(productsQuery.getInfiniteProductsQueryOptions(filters));

	const products = data?.pages.flatMap((page) => page.products) ?? [];

	const handleFetchMore = useCallback(async () => {
		await fetchNextPage();
	}, [fetchNextPage]);

	if (isLoading) {
		return <p>로딩 중...</p>;
	}

	if (isError) {
		return <p>에러가 발생했습니다.</p>;
	}

	if (data && products.length === 0) {
		return <p>검색 결과가 없습니다.</p>;
	}

	return (
		<InfinityScroll
			onFetchMore={handleFetchMore}
			disabled={!hasNextPage}
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
		</InfinityScroll>
	);
};
