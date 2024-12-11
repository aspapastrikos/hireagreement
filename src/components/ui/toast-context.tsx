import { createContext, useState, useCallback } from 'react';
import {
  ToastProvider as ToastProviderPrimitive,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from './toast';

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

interface ToastContextValue {
  toast: (props: Omit<ToastProps, 'id'>) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((props: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...props, id }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      <ToastProviderPrimitive>
        {children}
        {toasts.map(({ id, title, description, variant }) => (
          <Toast key={id} className={variant === 'destructive' ? 'destructive' : ''}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProviderPrimitive>
    </ToastContext.Provider>
  );
}