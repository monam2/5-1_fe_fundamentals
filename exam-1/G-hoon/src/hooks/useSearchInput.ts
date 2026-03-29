import { debounce } from 'es-toolkit/function';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useProductFilters } from './useProductFilters';

export function useSearchInput() {
  const { keyword: urlKeyword, setKeyword: setUrlKeyword } =
    useProductFilters();
  const [inputValue, setInputValue] = useState(urlKeyword);

  const hasValue = inputValue.length > 0;

  // URL keyword가 외부에서 변경되면 (초기화 등) 동기화
  useEffect(() => {
    setInputValue(urlKeyword);
  }, [urlKeyword]);

  const debouncedSetUrlKeyword = useMemo(
    () => debounce((value: string) => setUrlKeyword(value || null), 300),
    [setUrlKeyword],
  );

  useEffect(() => {
    if (inputValue === urlKeyword) return;

    debouncedSetUrlKeyword(inputValue);

    return () => debouncedSetUrlKeyword.cancel();
  }, [inputValue, urlKeyword, debouncedSetUrlKeyword]);

  const submit = useCallback(
    (value: string) => {
      debouncedSetUrlKeyword.cancel();
      setInputValue(value);
      setUrlKeyword(value || null);
    },
    [debouncedSetUrlKeyword, setUrlKeyword],
  );

  const clear = useCallback(() => {
    debouncedSetUrlKeyword.cancel();
    setInputValue('');
    setUrlKeyword(null);
  }, [debouncedSetUrlKeyword, setUrlKeyword]);

  return {
    inputValue,
    setInputValue,
    hasValue,
    submit,
    clear,
  };
}
