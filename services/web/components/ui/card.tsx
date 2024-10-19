import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  titleNode?: React.ReactNode;
}

function Card({ title, className, children, titleNode }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 bg-card p-4 rounded-xl w-full shadow border",
        className,
      )}
    >
      {titleNode
        ? titleNode
        : title && (
            <h3 className="my-prose text-xl font-extrabold tracking-tight lg:text-xl text-muted-foreground">
              {title}
            </h3>
          )}
      {children}
    </div>
  );
}

export default Card;
