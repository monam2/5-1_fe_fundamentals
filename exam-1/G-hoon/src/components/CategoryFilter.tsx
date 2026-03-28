import { createContext, useContext } from 'react';
import type { Category } from '../types/product';

interface CategoryFilterContextValue {
  selected: Category[];
  toggle: (category: Category) => void;
}

const CategoryFilterContext = createContext<CategoryFilterContextValue | null>(
  null,
);

function useCategoryFilterContext() {
  const context = useContext(CategoryFilterContext);
  if (!context) {
    throw new Error('CategoryFilter.Chip must be used within <CategoryFilter>');
  }
  return context;
}

interface CategoryFilterProps {
  selected: Category[];
  onChange: (categories: Category[]) => void;
  children: React.ReactNode;
}

function CategoryFilter({ selected, onChange, children }: CategoryFilterProps) {
  const toggle = (category: Category) => {
    if (selected.includes(category)) {
      onChange(selected.filter((c) => c !== category));
    } else {
      onChange([...selected, category]);
    }
  };

  return (
    <CategoryFilterContext.Provider value={{ selected, toggle }}>
      <fieldset className="flex items-center gap-1 overflow-x-auto scrollbar-hide md:gap-2">
        <legend className="sr-only">카테고리 필터</legend>
        {children}
      </fieldset>
    </CategoryFilterContext.Provider>
  );
}

interface ChipProps {
  value: Category;
  children: React.ReactNode;
}

function Chip({ value, children }: ChipProps) {
  const { selected, toggle } = useCategoryFilterContext();
  const isSelected = selected.includes(value);

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors md:px-4 md:py-1.5 md:text-sm ${
        isSelected
          ? 'border-black bg-black text-white'
          : 'border-gray-300 bg-white text-gray-700 hover:border-black'
      }`}
      onClick={() => toggle(value)}
    >
      {children}
    </button>
  );
}

CategoryFilter.Chip = Chip;

export default CategoryFilter;
