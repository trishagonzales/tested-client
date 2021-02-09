import { useState } from 'react';

export function useFormInput(initialValue?: string) {
  const [value, setValue] = useState(initialValue);

  return { value, onChange: (e: any) => setValue(e.target.value) };
}
