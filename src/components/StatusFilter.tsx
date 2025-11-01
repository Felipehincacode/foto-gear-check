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
  const filters: { type: FilterType; label: string; shortLabel: string; icon: React.ReactNode; count: number }[] = [
    { type: 'all', label: 'Todos', shortLabel: 'Todos', icon: <List className="h-3 w-3 md:h-4 md:w-4" />, count: counts.all },
    { type: 'packed', label: 'En el bolso', shortLabel: 'Bolso', icon: <Check className="h-3 w-3 md:h-4 md:w-4" />, count: counts.packed },
    { type: 'unpacked', label: 'En uso', shortLabel: 'Uso', icon: <X className="h-3 w-3 md:h-4 md:w-4" />, count: counts.unpacked },
  ];

  return (
    <div className="flex flex-wrap gap-1.5 md:gap-2">
      {filters.map(({ type, label, shortLabel, icon, count }) => (
        <Button
          key={type}
          size="sm"
          variant={currentFilter === type ? "default" : "outline"}
          onClick={() => onFilterChange(type)}
          className={cn(
            "transition-all duration-200 text-xs md:text-sm h-8 md:h-10 px-2 md:px-4",
            currentFilter === type && "bg-accent hover:bg-accent/90 text-accent-foreground"
          )}
        >
          {icon}
          <span className="ml-1 md:ml-2 hidden sm:inline">{label}</span>
          <span className="ml-1 md:ml-2 sm:hidden">{shortLabel}</span>
          <span className={cn(
            "ml-1 md:ml-2 px-1.5 md:px-2 py-0.5 rounded-full text-xs font-semibold",
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
