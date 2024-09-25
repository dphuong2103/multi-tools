import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Route } from "@/models/routes";

function NavBarLinks() {
  return (
    <div className="flex gap-4 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center" asChild>
          <Button variant="link">
            <>
              Encode/Decode
              <ChevronDown />
            </>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild className="cursor-pointer">
            <NavLink href="/hex" text="Hex" />
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <NavLink href="/base64" text="Base64" />
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
            <Link href="/hex">Upper Case</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <NavLink href="/svg-play-ground" text="SVG Editor" />
    </div>
  );
}

export default NavBarLinks;

interface NavLinkProps {
  text: string;
  href: Route;
  className?: string;
}
function NavLink({ href, text, className }: NavLinkProps) {
  return (
    <Button asChild variant="link" className={cn(className, "w-full")}>
      <Link href={href}>{text}</Link>
    </Button>
  );
}
