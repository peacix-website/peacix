import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5',

        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-md hover:-translate-y-0.5',

        accent:
          'bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-md hover:-translate-y-0.5',

        outline:
          'border border-border bg-white text-foreground hover:bg-muted hover:border-primary',

        ghost:
          'text-foreground hover:bg-muted',

        link:
          'text-primary underline-offset-4 hover:underline',

        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },

      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-8 text-base',
        icon: 'h-11 w-11 rounded-full',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
