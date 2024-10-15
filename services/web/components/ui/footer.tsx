import siteConfig from "@/constants/site-config";
import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaTelegramPlane } from "react-icons/fa";
function Footer() {
  return (
    <footer className="my-prose container py-2 md:py-0 md:px-6">
      <div className="flex flex-col items-center justify-between gap-2 md:gap-4 md:h-16 md:flex-row border-t-2">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by {siteConfig.author} with ❤️
        </p>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {siteConfig.title}. All Right Reserved.
        </p>
        <div>
          <Button variant={"ghost"} asChild={false}>
            <Link href={`mailto:${siteConfig.mail}`}>
              <CiMail className="w-6 h-6" />
            </Link>
          </Button>
          <Button variant={"ghost"} asChild={false}>
            <Link href={siteConfig.telegramLink} target="blank">
              <FaTelegramPlane className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
