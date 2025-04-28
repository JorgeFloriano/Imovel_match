import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusIconProps {
  value?: boolean | null | undefined | '';
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const StatusIcon = ({
  value,
  size = 20,
  strokeWidth = 2.5,
  className = "",
}: StatusIconProps) => {
  // Return empty string for null, undefined, or empty string
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return value ? (
    <Check
      className={cn("text-green-500 inline", className)}
      size={size}
      strokeWidth={strokeWidth}
    />
  ) : (
    <X
      className={cn("text-red-500 inline", className)}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
};