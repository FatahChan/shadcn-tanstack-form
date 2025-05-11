import { useState } from "react";

export const useLocalStorage = <T = string>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  const setValueWithStorage = (newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  return [value, setValueWithStorage] as const;
};
