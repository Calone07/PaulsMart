import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function Card({ children, className, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      className={cn(
        'bg-card rounded-3xl shadow-sm border border-gray-100 p-6 transition-shadow duration-300',
        hover && 'hover:shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
