"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function NavigationEvents() {
  // Get the current pathname from the router
  const pathname = usePathname();

  // Create a ref to store the previous pathname
  const ref = useRef(pathname);

  useEffect(() => {
    // Check if the pathname has changed and if the previous pathname was '/page'
    console.log("pathtName: ", pathname);

    if (ref.current !== pathname && ref.current === "/about") {
    }

    // Update the ref to store the current pathname
    ref.current = pathname;
  }, [pathname]);

  // Return null because this component doesn't render any UI elements
  return null;
}
