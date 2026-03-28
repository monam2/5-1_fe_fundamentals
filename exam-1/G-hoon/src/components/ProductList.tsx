import type { Product } from '../types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

function ProductList({
  products,
  isLoading,
  error,
  onRetry,
}: ProductListProps) {
  if (isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 text-gray-400"
        role="status"
      >
        <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black" />
        <p className="text-sm">상품을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 py-24"
        role="alert"
      >
        <p className="text-sm text-gray-500">{error}</p>
        <button
          type="button"
          className="border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          onClick={onRetry}
        >
          다시 시도
        </button>
      </div>
    );
  }

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
    <ol className="grid grid-cols-3 gap-x-2 gap-y-5 md:grid-cols-4 md:gap-x-4 md:gap-y-8">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ol>
  );
}

export default ProductList;
