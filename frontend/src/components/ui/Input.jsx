// Componente Input estilizado con validación visual
import { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    error,
    className = '',
    type = 'text',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-text-secondary text-sm font-medium mb-2">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                className={`
          w-full bg-primary border rounded-lg px-4 py-3
          text-white placeholder-text-muted
          transition-all duration-300
          focus:outline-none focus:ring-2
          ${error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-primary-light focus:border-accent focus:ring-accent/20'}
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-red-500 text-sm">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
