import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

/** Page-width wrapper: 1280px max, with responsive side gutters. */
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10", className)}
      {...props}
    />
  );
}
