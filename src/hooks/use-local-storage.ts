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

const COMMIT_REF = import.meta.env.PROD
  ? import.meta.env.VITE_COMMIT_REF
  : "local";

export const useLocalStorageWithCommitRef = <T = string>(
  key: string,
  initialValue: T,
) => {
  const keyWithCommitRef = `${key}-${COMMIT_REF}`;
  const [value, setValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = localStorage.getItem(keyWithCommitRef);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  const setValueWithStorage = (newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(keyWithCommitRef, JSON.stringify(newValue));

      for (let i = 0; i < localStorage.length; i++) {
        const cachedKey = localStorage.key(i);
        if (cachedKey?.startsWith(key) && cachedKey !== keyWithCommitRef) {
          localStorage.removeItem(cachedKey);
        }
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  return [value, setValueWithStorage] as const;
};
