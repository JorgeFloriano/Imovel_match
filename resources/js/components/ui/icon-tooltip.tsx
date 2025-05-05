import React from 'react';

interface IconTooltipProps {
  iconNode: React.ReactNode;
  tooltipText: string;
  iconClassName?: string;
  tooltipClassName?: string;
  containerClassName?: string;
}

const IconTooltip: React.FC<IconTooltipProps> = ({
  iconNode,
  tooltipText,
  iconClassName = '',
  tooltipClassName = '',
  containerClassName = '',
}) => {
  return (
    <div className={`group relative ${containerClassName}`}>
      <div className={`text-center ${iconClassName}`}>
        {iconNode && <span className="inline">{iconNode}</span>}
      </div>

      <span
        className={`invisible absolute mb-2 whitespace-nowrap rounded bg-white mx-2 px-2 py-1 text-gray-900 border-1 border-gray-900 group-hover:visible ${tooltipClassName}`}
      >
        {tooltipText}
      </span>
    </div>
  );
};

export default IconTooltip;