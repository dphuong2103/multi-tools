import Link from 'next/link'
import React from 'react'
import NavBarLinks from './nav-bar-links'
import { ThemeToggle } from './theme-toggle'
import MobileNavBar from './mobile-nav-bar'
import multiToolIcon from "@/assets/images/multi-tools-icon.svg"
import Image from 'next/image';
function NavBar() {
    return (
        <nav>
            <div className="w-full pl-6 p-4 flex items-center justify-between border bottom-1">
                <Link href="/" className="text-2xl font-bold flex gap-2 items-center">
                    <Image
                        src={multiToolIcon}
                        alt="Multi Tools"
                        width={36}
                    />
                    <span className="hidden md:inline-block">
                        Multi Tools
                    </span>
                    <span className="sr-only">Multi tools logo</span>
                </Link>
                <MobileNavBar />
                <div className="gap-5 hidden md:flex">
                    <NavBarLinks />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}

export default NavBar
