import { Suspense } from 'react';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';

export const Products = () => {
  return (
    <div className="w-full max-w-[860px] mx-auto px-4 py-6">
      <ProductFilters />
      <Suspense fallback={<LoadingFallback />}>
        <ProductList />
      </Suspense>
    </div>
  );
};

const LoadingFallback = () => (
  <div className="grid grid-cols-4 gap-4 mt-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={`loading-${
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index
          i
        }`}
        className="h-[300px] rounded-lg bg-gray-200 animate-pulse"
      />
    ))}
  </div>
);

const ProductList = () => {
  const { filters } = useProductFilters();
  const { data } = useProducts(filters);

  if (data.products.length === 0) {
    return (
      <div className="mt-6 flex items-center justify-center py-20 text-gray-400">
        찾으시는 상품이 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-4 gap-4">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
