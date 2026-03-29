import { useProductCount } from '@/hooks/useProductCount';

function ProductCount() {
  const totalCount = useProductCount();

  return (
    <p className="text-xs text-gray-500 md:text-sm">
      <span className="font-medium text-black">{totalCount}</span>개
    </p>
  );
}

export default ProductCount;
