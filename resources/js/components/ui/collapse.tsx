// components/ui/collapse.tsx
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Icon } from '@/components/icon';

interface CollapseProps {
  id: string;
  title: string;
  children?: React.ReactNode;
  asButton?: boolean;
  className?: string;
  buttonClassName?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  standalone?: boolean;
}

export function Collapse({
  id,
  title,
  children,
  asButton = false,
  className = '',
  buttonClassName = '',
  isOpen = false,
  onToggle,
  standalone = true,
}: CollapseProps) {
  const toggleComponent = asButton ? (
    <Button
      type="button"
      variant="outline"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={id}
      className={buttonClassName}
    >
      {title}
      {isOpen ? (
        <Icon className="h-4 w-4 text-[#B8B8B8]" iconNode={ChevronUp} />
      ) : (
        <Icon className="h-4 w-4 text-[#B8B8B8]" iconNode={ChevronDown} />
      )}
    </Button>
  ) : (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        onToggle?.();
      }}
      aria-expanded={isOpen}
      aria-controls={id}
    >
      {title}
    </a>
  );

  if (!standalone) {
    return toggleComponent;
  }

  return (
    <div className={className}>
      {toggleComponent}
      <div
        id={id}
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'h-full' : 'max-h-0'
        }`}
      >
        <div className="border border-gray-200 rounded-md mt-2 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}