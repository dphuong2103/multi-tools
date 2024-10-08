import { useCallback, useEffect, useRef, useState } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
    const isMounted = useRef(false);
    const [state, setState] = useState<T>(defaultValue);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            const storedValue = localStorage.getItem(key);
            if (storedValue) {
                setState(JSON.parse(storedValue) as T);
            }
        }
    }, [key]);

    const setValue = useCallback(
        (value: T) => {
            setState(value);
            localStorage.setItem(key, JSON.stringify(value));
        }, [setState, key]);

    return [state, setValue]
}