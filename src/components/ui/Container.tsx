import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12", className)}
      {...props}
    />
  );
}
