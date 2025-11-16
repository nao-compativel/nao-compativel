import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay); // Cancela o timeout se o valor mudar (ex: usuário continua digitando)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Só re-executa se o valor ou o delay mudar
  return debouncedValue;
}
