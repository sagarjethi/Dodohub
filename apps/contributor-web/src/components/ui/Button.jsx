import clsx from 'clsx';

export function Button({ variant = 'primary', className, children, ...props }) {
  return (
    <button
      className={clsx(
        'btn',
        variant === 'primary' && 'btn-primary',
        variant === 'secondary' && 'btn-secondary',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
