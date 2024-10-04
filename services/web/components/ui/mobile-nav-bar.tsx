"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./button";
import { ArrowBigRightIcon, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { ThemeToggle } from "./theme-toggle";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { cn } from "@/lib/utils";
import { Route } from "@/models/routes";
import LocaleSwitcher from "./locale-switcher";
import { DictionaryProps, LocaleProps } from "@/types/data-types";
import { LinkWithLocale } from "../link-with-locale";

interface MobileNavBarProps extends LocaleProps, DictionaryProps {}

function MobileNavBar({ locale, dictionary }: MobileNavBarProps) {
  const [open, setOpen] = useState(false);
  const [showEncodeDecode, setShowEncodeDecode] = useState(false);

  const onItemSelect = useCallback(() => {
    setShowEncodeDecode(false);
    setOpen(false);
  }, []);

  const onOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setShowEncodeDecode(false);
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  const items: (ItemProps | ExpandableItemProps)[] = useMemo(() => {
    return [
      {
        title: dictionary.navBar.encodeDecode.title,
        key: "encode-decode",
        items: [
          {
            href: "/hex",
            children: "Hex",
            onOpenChange: onOpenChange,
            onItemSelect: onItemSelect,
            key: "hex",
          },
          {
            href: "/base64",
            children: "Base 64",
            onOpenChange: onOpenChange,
            onItemSelect: onItemSelect,
            key: "base64",
          },
        ],
        onOpenChange: setShowEncodeDecode,
        isShowing: showEncodeDecode,
      },
      {
        key: "sql-formatter",
        children: dictionary.navBar.sqlFormatter,
        href: "/sql-formatter",
      },
      {
        key: "code-editor",
        children: dictionary.navBar.codeEditor,
        href: "/code-editor",
      },
      {
        href: "/svg-play-ground",
        children: dictionary.navBar.svgEditor,
        key: "svg-play-ground",
      },
    ];
  }, [
    onItemSelect,
    onOpenChange,
    showEncodeDecode,
    dictionary.navBar.encodeDecode.title,
    dictionary.navBar.svgEditor,
    dictionary.navBar.codeEditor,
    dictionary.navBar.sqlFormatter,
  ]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="inline-block md:hidden">
        <Button variant="ghost">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between pt-2">
          <LocaleSwitcher dictionary={dictionary} />
          <ThemeToggle />
        </div>
        <div>
          {items.map((item) => {
            if (isExpandableItem(item)) {
              const { key, ...rest } = item;
              return <ExpandableItem key={key} {...rest} />;
            } else {
              const { key, ...rest } = item;
              return <Item key={key} {...rest} />;
            }
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavBar;

interface ItemProps extends Omit<LinkProps, "href"> {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  key: string;
  href: Route;
}

function Item({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: ItemProps) {
  const router = useRouter();
  return (
    <Button
      asChild
      variant="link"
      className={cn(className, "w-full justify-start px-0")}
    >
      <LinkWithLocale
        href={href}
        onClick={() => {
          router.push(href.toString());
          onOpenChange?.(false);
        }}
        className={className}
        {...props}
      >
        {children}
      </LinkWithLocale>
    </Button>
  );
}

interface ExpandableItemProps {
  title: string;
  items: ItemProps[];
  onOpenChange: (open: boolean) => void;
  isShowing: boolean;
  key: string;
}

function ExpandableItem({
  title,
  items,
  onOpenChange,
  isShowing,
}: ExpandableItemProps) {
  return (
    <Collapsible onOpenChange={onOpenChange}>
      <CollapsibleTrigger className="flex justify-between w-full" asChild>
        <Button variant="link" className={"w-full justify-between px-0"}>
          {title}
          <ArrowBigRightIcon
            className={cn({
              "rotate-90": isShowing,
            })}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="ps-2 flex flex-col">
        {items.map((i) => {
          const { key, ...rest } = i;
          return <Item key={key} {...rest} />;
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}

function isExpandableItem(
  item: ItemProps | ExpandableItemProps,
): item is ExpandableItemProps {
  return "items" in item;
}
