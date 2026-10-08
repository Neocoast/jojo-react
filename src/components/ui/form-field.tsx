import { type InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function FormField({ error, ...inputProps }: FormFieldProps) {
  return (
    <div>
      <div className="px-3 py-2.5 rounded-md outline-1 -outline-offset-1 outline-input flex items-center overflow-hidden">
        <input
          className="flex-1 text-sm leading-5 bg-transparent outline-none placeholder:text-muted-foreground"
          {...inputProps}
        />
      </div>
      {error && <p className="mt-1 text-destructive text-xs font-medium">{error}</p>}
    </div>
  );
}
