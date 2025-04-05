import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, value, onChange, ...props }: React.ComponentProps<"input">) {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (value === "0" || value === 0) {
      if (onChange) {
        const event = {
          ...e,
          target: {
            ...e.target,
            value: ""
          }
        }
        onChange(event)
      }
    }
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "dark:[color-scheme:dark] dark:[&::-webkit-calendar-picker-indicator]:invert dark:[&::-webkit-calendar-picker-indicator]:opacity-40",
        className
      )}
      value={value}
      onChange={onChange}
      onFocus={handleFocus}
      {...props}
    />
  )
}

export { Input }