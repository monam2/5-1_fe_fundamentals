import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps<TFieldValues extends FieldValues, TOption extends SelectOption> {
  id: string;
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  options: TOption[];
  placeholder: string;
}

export function SelectField<TFieldValues extends FieldValues, TOption extends SelectOption>({
  id,
  name,
  control,
  options,
  placeholder,
}: SelectFieldProps<TFieldValues, TOption>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger id={id} className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
