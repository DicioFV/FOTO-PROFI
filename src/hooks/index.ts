// src/hooks/index.ts
// CINEVISION AI — CUSTOM HOOKS

import { useState, useCallback, useEffect } from 'react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useLocalStorage
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useMediaQuery
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useDebounce
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useImageUpload
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  imageUrl: string | null;
}

export function useImageUpload() {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    imageUrl: null,
  });

  const upload = useCallback(async (file: File) => {
    setState({ isUploading: true, progress: 0, error: null, imageUrl: null });

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setState(prev => ({ ...prev, progress }));
        }
      };

      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setState({ isUploading: false, progress: 100, error: null, imageUrl });
        resolve(imageUrl);
      };

      reader.onerror = () => {
        const error = 'Falha ao carregar imagem';
        setState({ isUploading: false, progress: 0, error, imageUrl: null });
        reject(new Error(error));
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const reset = useCallback(() => {
    setState({ isUploading: false, progress: 0, error: null, imageUrl: null });
  }, []);

  return { ...state, upload, reset };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useCopyToClipboard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { copied, copy };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useOnScreen
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useOnScreen(ref: React.RefObject<Element>, rootMargin = '0px'): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useMobile
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useMobile() {
  return useMediaQuery('(max-width: 768px)');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useKeyPress
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) setKeyPressed(true);
    };
    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) setKeyPressed(false);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useToggle
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse, setValue };
}
