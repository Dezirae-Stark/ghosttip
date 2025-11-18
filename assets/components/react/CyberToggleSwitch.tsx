import React, { useState } from 'react';

export interface CyberToggleSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const CyberToggleSwitch: React.FC<CyberToggleSwitchProps> = ({
  checked: controlledChecked,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
  };

  return (
    <label className={`flex items-center space-x-3 cursor-pointer ${className}`}>
      {/* Toggle switch */}
      <div
        className={`
          relative w-14 h-8 rounded-full
          transition-all duration-300
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        style={{
          background: checked
            ? 'linear-gradient(135deg, #00FFFF, #B026FF)'
            : 'rgba(26, 31, 46, 0.8)',
          border: `2px solid ${checked ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
          boxShadow: checked
            ? '0 0 20px rgba(0, 255, 255, 0.5)'
            : '0 2px 8px rgba(0, 0, 0, 0.4)',
        }}
        onClick={handleToggle}
      >
        {/* Slider knob */}
        <div
          className={`
            absolute top-1 w-5 h-5 rounded-full
            bg-white transition-all duration-300
            ${checked ? 'left-7' : 'left-1'}
          `}
          style={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        />

        {/* Inner glow effect */}
        {checked && (
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.8), transparent)',
            }}
          />
        )}
      </div>

      {/* Label */}
      {label && (
        <span className="text-text-primary font-body select-none">
          {label}
        </span>
      )}
    </label>
  );
};
