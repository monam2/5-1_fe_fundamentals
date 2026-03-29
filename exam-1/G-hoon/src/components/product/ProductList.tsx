import { TriangleAlert } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from './ProductCard';

const GRID_CLASS =
  'grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-x-4 md:gap-y-8';

function ProductList() {
  const { products, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts();

  const observerRef = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    enabled: hasNextPage && !isFetchingNextPage && !error,
    rootMargin: '1500px',
    threshold: 0,
  });

  // 빈 결과
  if (products.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 text-gray-400"
        role="status"
      >
        <p className="text-base font-medium text-gray-900">
          검색 결과가 없습니다
        </p>
        <p className="mt-1 text-sm">다른 검색어 또는 필터를 시도해보세요.</p>
      </div>
    );
  }

  return (
    <>
      <ol className={GRID_CLASS}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ol>

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="h-1" />

      {/* 다음 페이지 로딩 중 */}
      {isFetchingNextPage && (
        <div className="mt-5" role="status" aria-label="추가 상품 로딩 중">
          <div className="flex items-center justify-center gap-2 py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
            <p className="text-sm">상품을 불러오는 중...</p>
          </div>
        </div>
      )}

      {/* 다음 페이지 에러 (기존 상품은 유지) */}
      {error && !isFetchingNextPage && (
        <div
          className="mt-5 flex flex-col items-center gap-3 py-6"
          role="alert"
        >
          <TriangleAlert className="h-8 w-8 text-gray-300" />
          <p className="text-sm text-gray-500">{error}</p>
          <button
            type="button"
            className="border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            onClick={() => fetchNextPage()}
          >
            다시 시도
          </button>
        </div>
      )}
    </>
  );
}

export default ProductList;
