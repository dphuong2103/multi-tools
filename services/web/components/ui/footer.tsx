import siteConfig from "@/constants/site-config";
import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaTelegramPlane } from "react-icons/fa";
import LinkWithLocale from "../link-with-locale";
import { pageToRouteMapping } from "@/models/routes";

function Footer() {
  return (
    <footer className="container py-2 md:py-0 md:px-6  border-t-2">
      <div className="flex gap-2 justify-center">
        <Button asChild variant="link">
          <LinkWithLocale href={pageToRouteMapping.aboutUs}>
            About Us
          </LinkWithLocale>
        </Button>

        <Button asChild variant="link">
          <LinkWithLocale href={pageToRouteMapping.contactUs}>
            Contact us
          </LinkWithLocale>
        </Button>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 md:gap-4 md:h-16 md:flex-row my-prose">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left !mt-0 !mb-0">
          Built by {siteConfig.author} with ❤️
        </p>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left !mt-0 !mb-0">
          © {siteConfig.title}. All Right Reserved.
        </p>
        <div>
          <Button variant={"ghost"} asChild>
            <Link href={`mailto:${siteConfig.mail}`}>
              <CiMail className="w-6 h-6" />
              <span className="sr-only">mail</span>
            </Link>
          </Button>
          <Button variant={"ghost"} asChild>
            <Link href={siteConfig.telegramLink} target="blank">
              <FaTelegramPlane className="w-6 h-6" />
              <span className="sr-only">telegram</span>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
