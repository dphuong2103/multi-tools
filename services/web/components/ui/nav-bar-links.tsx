import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

function NavBarLinks() {
    return (
        <div className="flex gap-4 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                    Encode/Decode
                    <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/hex">
                            Hex
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/base64">
                            Base64
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                    String
                    <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/hex">
                            Upper Case
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/svg-play-ground">
                SVG Editor
            </Link>
        </div>
    )
}

export default NavBarLinks
