import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type Option = {
  id: string;
  label: string;
  value: string;
};

type SelectFieldProps = {
  value?: string;
  placeholder?: string;
  options: Option[];
  onChange: (value: string) => void;
  defaultValue: string;
  error?: string;
};

export function SelectField({
  placeholder,
  value,
  onChange,
  defaultValue,
  options,
  error
}: SelectFieldProps) {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue} value={value}>
      <SelectTrigger
        className={cn(
          'data-[placeholder]:text-muted-foreground',
          error && 'border-destructive'
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.id} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
