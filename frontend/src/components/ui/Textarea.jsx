// Componente Textarea estilizado
import { forwardRef } from 'react';

const Textarea = forwardRef(({
    label,
    error,
    className = '',
    rows = 4,
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-text-secondary text-sm font-medium mb-2">
                    {label}
                </label>
            )}
            <textarea
                ref={ref}
                rows={rows}
                className={`
          w-full bg-primary border rounded-lg px-4 py-3
          text-white placeholder-text-muted resize-none
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

Textarea.displayName = 'Textarea';

export default Textarea;
