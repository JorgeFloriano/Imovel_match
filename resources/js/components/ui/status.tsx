import { cn } from "@/lib/utils";

interface StatusProps {
  value?: boolean | null | undefined | '';
  className?: string;
  trueText?: string;
  falseText?: string;
}

export const Status = ({
  value,
  className = "",
  trueText = "Sim",
  falseText = "Não",
}: StatusProps) => {
  // Return empty string for null, undefined, or empty string
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return (
    <span className={cn("inline", className)}>
      {value ? trueText : falseText}
    </span>
  );
};