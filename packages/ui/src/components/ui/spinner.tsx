import { Loader2 } from 'lucide-react';
import { cva } from "class-variance-authority"

import { cn } from "@ui/lib/utils";

const spinnerVariant = cva(
  "animate-spin",
  {
    variants: {
      size: {
        default: "h-8 w-8",
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
      },
      color: {
        default: "stroke-black-400",
        orange: "stroke-orange-400",
        black: "stroke-black-400",
        primary: "stroke-primary"
      },
    },
    defaultVariants: {
      size: "default",
      color: "primary",
    },
  }
)

type SpinnerProps = {
  size?: "sm" | "md" | "lg",
  color?: "orange" | "black" | "primary"
}

export default function Spinner({ size, color } : SpinnerProps ) {
  return <Loader2 className={cn(spinnerVariant({ size, color }))} />
}