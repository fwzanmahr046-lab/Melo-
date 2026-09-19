import { cn } from '@/lib/utils';

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn('grid place-items-center py-12', className)}>
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink-900 border-t-transparent" />
    </div>
  );
}
