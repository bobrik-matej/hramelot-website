import {HTMLAttributes, forwardRef} from 'react';
import {clsx} from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outlined';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({className, variant = 'default', children, ...props}, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    'rounded-lg',
                    variant === 'default' && 'bg-white shadow-sm dark:bg-gray-900',
                    variant === 'outlined' && 'border border-gray-200 dark:border-gray-800',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export const CardHeader = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
    <div className={clsx('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

export const CardTitle = ({className, ...props}: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={clsx('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
);

export const CardContent = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
    <div className={clsx('p-6 pt-0', className)} {...props} />
);

export const CardDescription = ({className, ...props}: HTMLAttributes<HTMLParagraphElement>) => (
    <p className={clsx('text-sm text-muted-foreground', className)} {...props} />
);
