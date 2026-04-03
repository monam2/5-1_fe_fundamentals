import { useQuery } from '@tanstack/react-query';

const GET_AUTOCOMPLETE_URL = '/api/autocomplete';

interface IAutocompleteResponse {
  suggestions: string[];
}

const fetchAutoComplete = async (
  keyword: string,
): Promise<IAutocompleteResponse> => {
  const params = new URLSearchParams({ keyword });
  const response = await fetch(`${GET_AUTOCOMPLETE_URL}?${params.toString()}`);
  if (!response.ok) throw new Error('자동완성 요청에 실패했습니다.');
  return response.json();
};

// TODO: 에러 처리 필요..?
export const useAutoComplete = (keyword: string) => {
  return useQuery<IAutocompleteResponse>({
    queryKey: ['autocomplete', keyword],
    queryFn: () => fetchAutoComplete(keyword),
    enabled: keyword.trim().length > 0,
    // NOTE: useQueryErrorResetBoundary를 ErrorBoundary와 함께 사용하면 TanStack Query가 에러를 ErrorBoundary로 전파하는 모드로 동작하여 명시적으로 false 처리
    throwOnError: false,
  });
};
