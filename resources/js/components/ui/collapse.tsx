import { useState } from 'react';
import { Button } from './button';

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
    <div className={className}>
      {asButton ? (
        <Button
          type="button"
          variant="outline"
          onClick={toggleCollapse}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          {title}
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
        <div className="p-4 border border-gray-200 rounded-md mt-2 bg-white shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}