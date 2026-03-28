import type { SortOption } from '../types/product';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'price_asc', label: '낮은 가격순' },
  { value: 'price_desc', label: '높은 가격순' },
  { value: 'newest', label: '신상품순' },
  { value: 'rating', label: '평점순' },
];

interface SortSelectProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      className="cursor-pointer border-none bg-transparent text-xs font-medium text-gray-900 outline-none md:text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortSelect;
