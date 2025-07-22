import { useState } from 'react';
import { Button } from './button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Icon } from '@/components/icon';


interface CollapseProps {
  id: string;
  title: string;
  children: React.ReactNode;
  asButton?: boolean;
  className?: string;
  buttonClassName?: string;
}

export function Collapse({
  id,
  title,
  children,
  asButton = false,
  className = 'py-2',
}: CollapseProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={` dark:bg-neutral-950 text-sm dark:text-neutral-100 ${className}`}>
      {asButton ? (
        <Button
          type="button"
          variant="outline"
          onClick={toggleCollapse}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          {title}
          {isOpen ? 
          ChevronUp && <Icon className="h-4 w-4 text-[#B8B8B8]" iconNode={ChevronUp} /> : 
          ChevronDown && <Icon className="h-4 w-4 text-[#B8B8B8]" iconNode={ChevronDown} />}
        </Button>
      ) : (
        <a
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            toggleCollapse();
          }}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          {title}
        </a>
      )}

      <div
        id={id}
        className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="p-4 border border-gray-200 rounded-md mt-2 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}