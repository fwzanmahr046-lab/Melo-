import { Minus, Plus } from 'lucide-react';

interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
}

export function QuantitySelector({ value, min = 1, max = 99, onChange }: Props) {
  return (
    <div className="inline-flex items-center rounded-full border border-ink-900/10">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 disabled:opacity-30"
        aria-label="تقليل"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm font-medium">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 disabled:opacity-30"
        aria-label="زيادة"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
