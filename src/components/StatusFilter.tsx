import { FilterType } from "@/types/equipment";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { List, Check, X } from "lucide-react";

interface StatusFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    packed: number;
    unpacked: number;
  };
}

export const StatusFilter = ({ currentFilter, onFilterChange, counts }: StatusFilterProps) => {
  const filters: { type: FilterType; label: string; icon: React.ReactNode; count: number }[] = [
    { type: 'all', label: 'Todos', icon: <List className="h-4 w-4" />, count: counts.all },
    { type: 'packed', label: 'Empaquetados', icon: <Check className="h-4 w-4" />, count: counts.packed },
    { type: 'unpacked', label: 'Pendientes', icon: <X className="h-4 w-4" />, count: counts.unpacked },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ type, label, icon, count }) => (
        <Button
          key={type}
          variant={currentFilter === type ? "default" : "outline"}
          onClick={() => onFilterChange(type)}
          className={cn(
            "transition-all duration-200",
            currentFilter === type && "bg-accent hover:bg-accent/90 text-accent-foreground"
          )}
        >
          {icon}
          <span className="ml-2">{label}</span>
          <span className={cn(
            "ml-2 px-2 py-0.5 rounded-full text-xs font-semibold",
            currentFilter === type 
              ? "bg-accent-foreground/20" 
              : "bg-muted"
          )}>
            {count}
          </span>
        </Button>
      ))}
    </div>
  );
};
