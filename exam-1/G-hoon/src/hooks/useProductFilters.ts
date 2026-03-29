import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import type { Category, SortOption } from '@/types/product';

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') ?? '';
  const categories = (searchParams
    .get('categories')
    ?.split(',')
    .filter(Boolean) ?? []) as Category[];
  const sort = (searchParams.get('sort') ?? 'newest') as SortOption;

  const setKeyword = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        if (value) {
          prev.set('keyword', value);
        } else {
          prev.delete('keyword');
        }
        return prev;
      });
    },
    [setSearchParams],
  );

  const setCategories = useCallback(
    (value: Category[]) => {
      setSearchParams((prev) => {
        if (value.length > 0) {
          prev.set('categories', value.join(','));
        } else {
          prev.delete('categories');
        }
        return prev;
      });
    },
    [setSearchParams],
  );

  const setSort = useCallback(
    (value: SortOption) => {
      setSearchParams((prev) => {
        if (value !== 'newest') {
          prev.set('sort', value);
        } else {
          prev.delete('sort');
        }
        return prev;
      });
    },
    [setSearchParams],
  );

  const resetAll = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    keyword,
    categories,
    sort,
    setKeyword,
    setCategories,
    setSort,
    resetAll,
  };
}
