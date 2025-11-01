import { Equipment } from "@/types/equipment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EquipmentCardProps {
  equipment: Equipment;
  onTogglePacked: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EquipmentCard = ({ equipment, onTogglePacked, onDelete }: EquipmentCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg",
      "border",
      equipment.isPacked ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"
    )}>
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={equipment.imageUrl} 
          alt={equipment.name}
          className="h-full w-full object-cover"
        />
        <Badge 
          className={cn(
            "absolute top-1.5 right-1.5 md:top-3 md:right-3 shadow-lg text-xs px-1.5 py-0.5 md:px-2.5 md:py-0.5",
            equipment.isPacked 
              ? "bg-success text-success-foreground" 
              : "bg-warning text-warning-foreground"
          )}
        >
          {equipment.isPacked ? (
            <><Check className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5" /> <span className="hidden md:inline">Empaquetado</span></>
          ) : (
            <><X className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5" /> <span className="hidden md:inline">Pendiente</span></>
          )}
        </Badge>
      </div>
      
      <div className="p-2 md:p-4 space-y-2 md:space-y-3">
        <div>
          <h3 className="font-semibold text-sm md:text-lg text-foreground mb-0.5 md:mb-1 line-clamp-1">{equipment.name}</h3>
          {equipment.description && (
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-1 md:line-clamp-2">{equipment.description}</p>
          )}
          {equipment.category && (
            <p className="text-xs text-accent mt-1 hidden md:block">{equipment.category}</p>
          )}
        </div>
        
        <div className="flex gap-1.5 md:gap-2">
          <Button
            onClick={() => onTogglePacked(equipment.id)}
            size="sm"
            className={cn(
              "flex-1 transition-all duration-200 text-xs md:text-sm h-8 md:h-10",
              equipment.isPacked 
                ? "bg-warning hover:bg-warning/90 text-warning-foreground" 
                : "bg-success hover:bg-success/90 text-success-foreground"
            )}
          >
            {equipment.isPacked ? "Desempacar" : "Empacar"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(equipment.id)}
            className="border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground h-8 w-8 md:h-10 md:w-10"
          >
            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
