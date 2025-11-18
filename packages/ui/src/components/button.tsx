/**
 * GhostTip - Button Component
 * Cyberpunk-styled button with variants
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] focus-visible:ring-cyan-500',
        neon: 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-white hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] font-bold',
        ghost:
          'text-gray-300 hover:bg-white/10 hover:text-cyan-400 focus-visible:ring-cyan-500',
        destructive:
          'bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(255,0,85,0.5)]',
        outline:
          'border border-gray-700 bg-transparent hover:bg-white/5 hover:text-cyan-400',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
