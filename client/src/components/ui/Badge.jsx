import { cn } from '../../utils/cn';

const colors = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-800',
};

export default function Badge({ children, color = 'primary', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        colors[color],
        className
      )}
    >
      {children}
    </span>
  );
}
