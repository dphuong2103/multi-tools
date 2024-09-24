"use client"
import React, { useCallback, useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './button'
import { ArrowBigRightIcon, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'
import { cn } from '@/lib/utils'
import multiToolsIcon from "@/assets/images/multi-tools-icon.svg";
import Image from "next/image";

function MobileNavBar() {
    const [open, setOpen] = useState(false);
    const [showEncodeDecode, setShowEncodeDecode] = useState(false);

    const onItemSelect = useCallback(() => {
        setShowEncodeDecode(false);
        setOpen(false);
    }, [])

    const onOpenChange = useCallback((open: boolean) => {
        if (!open) {
            setShowEncodeDecode(false);
            setOpen(false);
        }
        else {
            setOpen(true);
        }
    }, []);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild className='inline-block md:hidden'>
                <Button variant="ghost">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-2" >
                <div className="flex items-center justify-between pt-2">
                    <Link href="/" className="text-2xl font-bold">
                        <Image
                            src={multiToolsIcon}
                            alt="Multi Tools"
                            width={36}
                        /></Link>
                    <ThemeToggle />
                </div>
                <div>
                    <Collapsible onOpenChange={setShowEncodeDecode}>
                        <CollapsibleTrigger className="flex justify-between w-full">
                            Encode/Decode
                            <ArrowBigRightIcon
                                className={cn({
                                    "rotate-90": showEncodeDecode,
                                })}
                            />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="ps-2 flex flex-col">
                            <MobileLink
                                href="/hex"
                                onOpenChange={onItemSelect}
                            >
                                Hex
                            </MobileLink>
                            <MobileLink
                                href="/base64"
                                onOpenChange={onItemSelect}
                            >
                                Base 64
                            </MobileLink>
                        </CollapsibleContent>
                    </Collapsible>
                    <MobileLink
                        href="/svg-play-ground"
                        onOpenChange={onItemSelect}
                    >
                        SVG Play Ground
                    </MobileLink>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNavBar

interface MobileLinkProps extends LinkProps {
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

function MobileLink({
    href,
    onOpenChange,
    children,
    className,
    ...props
}: MobileLinkProps) {
    const router = useRouter();
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString());
                onOpenChange?.(false);
            }}
            className={className}
            {...props}
        >
            {children}
        </Link>
    );
}
