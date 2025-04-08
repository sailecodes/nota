import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface CustomFieldProps {
  control: any;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export default function CustomField({
  control,
  name,
  label,
  type,
  placeholder,
  error,
  className,
}: CustomFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-muted-foreground">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage>{error}</FormMessage>
        </FormItem>
      )}
    />
  );
}
