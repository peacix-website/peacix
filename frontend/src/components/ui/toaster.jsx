import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import React from 'react';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex flex-col gap-1 pr-6">
            {title && (
              <ToastTitle className="text-sm font-semibold tracking-tight">
                {title}
              </ToastTitle>
            )}
            {description && (
              <ToastDescription className="text-sm leading-relaxed opacity-80">
                {description}
              </ToastDescription>
            )}
          </div>

          {action}

          <ToastClose />
        </Toast>
      ))}

      <ToastViewport />
    </ToastProvider>
  );
}
