'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import React, { createContext, useCallback, useState } from 'react'

interface LoadingContextProps {
    toggleIsLoading: (isLoading: boolean) => void;
    isLoading: boolean
}
export const LoadingContext = createContext<LoadingContextProps>({} as LoadingContextProps);

function LoadingProvider({ children }: {
    children: React.ReactNode
}) {
    const [isLoading, setIsLoading] = useState(false);

    const toggleIsLoading = useCallback(
        (isLoading: boolean) => {
            setIsLoading(isLoading);
        }, [setIsLoading])

    return (
        <LoadingContext.Provider value={{ toggleIsLoading, isLoading }}>
            <Dialog open={isLoading}>
                <DialogContent className="w-0">
                    <div>
                        <Loader2 className="animate-spin" />
                    </div>
                </DialogContent>
            </Dialog>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingProvider
