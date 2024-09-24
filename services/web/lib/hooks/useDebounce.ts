import { useCallback, useEffect, useRef } from "react";

export function useDebounce(func: (...args: any) => void, delayMs?: number) {
    const timeOutIdRef = useRef<NodeJS.Timeout | null>(null);

    const debounceFunc = useCallback((...args: Parameters<typeof func>) => {
        if (timeOutIdRef.current) {
            clearTimeout(timeOutIdRef.current);
        }
        timeOutIdRef.current = setTimeout(() => {
            func(...args);
        }, delayMs);
    }, [func, delayMs])

    useEffect(() => {
        return () => {
            if (timeOutIdRef.current) {
                clearTimeout(timeOutIdRef.current);
            }
        };
    }, []);

    return debounceFunc;

}