import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-brand-black text-brand-ivory hover:bg-brand-black-light shadow-sm font-semibold",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-brand-black bg-transparent text-brand-black hover:bg-brand-butter",
        secondary:
          "bg-brand-butter text-brand-black hover:bg-brand-butter-dark font-semibold border border-brand-beige",
        ghost: "hover:bg-brand-butter/60 text-brand-black",
        link: "text-brand-black underline-offset-4 hover:underline",
        goldOutline:
          "border-2 border-brand-black bg-transparent text-brand-black hover:bg-brand-butter font-semibold",
      },
      size: {
        default: "h-11 px-7 py-2.5",
        sm: "h-8 px-4 text-xs",
        lg: "h-13 px-9 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
