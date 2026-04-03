import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAutoComplete } from '@/hooks/queries/useAutoComplete';
import { useAutocompleteDropdown } from '@/hooks/useAutocompleteDropdown';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const AUTOCOMPLETE_DEBOUNCE_MS = 300;

interface SearchInputProps {
  defaultValue?: string;
  onSearch: (keyword: string) => void;
}

export const SearchInput = ({
  defaultValue = '',
  onSearch,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const debouncedKeyword = useDebouncedValue(
    inputValue,
    AUTOCOMPLETE_DEBOUNCE_MS,
  );

  const { data } = useAutoComplete(debouncedKeyword);
  const suggestions = data?.suggestions ?? [];
  const hasSuggestions = suggestions.length > 0;

  const { isOpen, containerRef, openDropdown, closeDropdown } =
    useAutocompleteDropdown();

  useEffect(() => {
    if (suggestions.length > 0 && debouncedKeyword.trim()) {
      openDropdown();
    }
  }, [suggestions, debouncedKeyword, openDropdown]);

  const submitSearch = () => {
    onSearch(inputValue.trim());
    closeDropdown();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value.trim()) closeDropdown();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitSearch();
    }
    if (e.key === 'Escape') {
      closeDropdown();
      inputRef.current?.blur();
    }
  };

  const handleSelect = (suggestion: string) => {
    setInputValue(suggestion);
    closeDropdown();
  };

  return (
    <div ref={containerRef} className="flex w-full items-start gap-2">
      <div className="relative min-w-0 flex-1">
        <Input
          ref={inputRef}
          className="w-full"
          placeholder="keyword 검색"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />

        {isOpen && hasSuggestions && (
          <ul className="absolute z-10 mt-1 w-full rounded-md border border-border bg-popover shadow-md">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  className="w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                  onMouseDown={(e) => {
                    // NOTE: onBlur보다 먼저 실행되도록 mousedown 사용
                    e.preventDefault();
                    handleSelect(suggestion);
                  }}
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button
        type="button"
        size="sm"
        className="shrink-0"
        onClick={submitSearch}
      >
        검색
      </Button>
    </div>
  );
};
