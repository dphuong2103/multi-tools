import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Route } from "@/models/routes";
import { DictionaryProps } from "@/types/data-types";
import { LinkWithLocale } from "../link-with-locale";

interface NavBarLinkProps extends DictionaryProps { }

async function NavBarLinks({ dictionary }: NavBarLinkProps) {
  const items: (ItemProps | DropdownItemProps)[] = [
    {
      key: "encode-decode",
      title: dictionary.navBar.encodeDecode.title,
      items: [
        {
          key: "hex",
          text: dictionary.navBar.encodeDecode.hex,
          href: "/hex",
        },
        {
          key: "base64",
          text: dictionary.navBar.encodeDecode.base64,
          href: "/base64",
        },
      ],
    },
    {
      key: "sql-formatter",
      text: dictionary.navBar.sqlFormatter,
      href: "/sql-formatter",
    },
    {
      key: "code-editor",
      text: dictionary.navBar.codeEditor,
      href: "/code-editor",
    },
    {
      key: "svg-editor",
      text: dictionary.navBar.svgEditor,
      href: "/svg-play-ground",
    },
  ];

  return (
    <div className="flex gap-3 items-center">
      {items.map((item) => {
        if (isDropdownItem(item)) {
          const { key, ...rest } = item;
          return <DropdownItem key={key} {...rest} />;
        }
        const { key, ...rest } = item;
        return <Item key={key} {...rest} />;
      })}
    </div>
  );
}

export default NavBarLinks;

interface ItemProps {
  text: string;
  href: Route;
  className?: string;
  key: string;
}
function Item({ href, text, className }: ItemProps) {
  return (
    <Button asChild variant="link" className={cn(className, "w-full")}>
      <LinkWithLocale href={href}>{text}</LinkWithLocale>
    </Button>
  );
}

interface DropdownItemProps {
  title: string;
  key: string;
  items: ItemProps[];
}

function DropdownItem({ title, items }: DropdownItemProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center" asChild>
        <Button variant="link">
          {title}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => {
          const { key, ...rest } = item;
          return <Item key={key} {...rest} />;
          // <DropdownMenuItem asChild className="cursor-pointer" key={key}>
          //   <Item key={key} {...rest} />
          //   {/* <Link href={rest.href}>{rest.text}</Link> */}
          // </DropdownMenuItem>
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function isDropdownItem(
  item: ItemProps | DropdownItemProps,
): item is DropdownItemProps {
  return "items" in item;
}
