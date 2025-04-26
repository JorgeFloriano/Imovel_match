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
      <div className={`p-1 text-center ${iconClassName}`}>
        {iconNode && <span className="inline">{iconNode}</span>}
      </div>

      <span
        className={`invisible absolute bottom-full mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:visible ${tooltipClassName}`}
      >
        {tooltipText}
      </span>
    </div>
  );
};

export default IconTooltip;