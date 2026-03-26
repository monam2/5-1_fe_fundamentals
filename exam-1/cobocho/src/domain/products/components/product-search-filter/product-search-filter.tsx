import { Card } from '@/components/card/card';
import { HStack, VStack } from '@/components/layout';
import {
	ToggleGroup,
	ToggleGroupItem,
} from '@/components/toggle-group/toggle-group';
import type {
	Category,
	ProductsRequest,
	ProductsSortOption,
} from '../../api/products.types';
import { CATEGORY_LABELS, SORT_OPTION_LABELS } from '../../api/products.types';
import { ProductAutoComplete } from '../product-autocomplete/product-autocomplete';

interface ProductSearchFilterProps {
	value: ProductsRequest;
	onChange: (value: Partial<ProductsRequest>) => void;
}

export const ProductSearchFilter = ({
	value,
	onChange,
}: ProductSearchFilterProps) => {
	const categories = value.categories ?? [];

	const resetFilters = () => {
		onChange({
			categories: null,
			keyword: null,
			sort: null,
			page: 1,
			size: 20,
		});
	};

	return (
		<Card>
			<VStack gap={4}>
				<ProductAutoComplete
					value={value.keyword ?? ''}
					onChange={(keyword) => onChange({ keyword: keyword || null })}
				/>
				<HStack gap={4} wrap>
					<HStack gap={2}>
						<span className="text-sm font-medium text-gray-500">카테고리</span>
						<ToggleGroup
							type="multiple"
							value={categories}
							onChange={(next) =>
								onChange({
									categories:
										next.length > 0 ? (next as Category[]) : null,
								})
							}
						>
							{(Object.keys(CATEGORY_LABELS) as Category[]).map(
								(category) => (
									<ToggleGroupItem key={category} value={category}>
										{CATEGORY_LABELS[category]}
									</ToggleGroupItem>
								),
							)}
						</ToggleGroup>
					</HStack>
					<div className="h-5 w-px bg-gray-200" />
					<HStack gap={2}>
						<span className="text-sm font-medium text-gray-500">정렬</span>
						<ToggleGroup
							type="single"
							value={value.sort}
							onChange={(next) =>
								onChange({ sort: next as ProductsSortOption | null })
							}
						>
							{(Object.keys(SORT_OPTION_LABELS) as ProductsSortOption[]).map(
								(option) => (
									<ToggleGroupItem key={option} value={option}>
										{SORT_OPTION_LABELS[option]}
									</ToggleGroupItem>
								),
							)}
						</ToggleGroup>
					</HStack>
					<button
						type="button"
						className="ml-auto rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100"
						onClick={resetFilters}
					>
						초기화
					</button>
				</HStack>
			</VStack>
		</Card>
	);
};
