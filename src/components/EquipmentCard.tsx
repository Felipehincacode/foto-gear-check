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
      "border-2",
      equipment.isPacked ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"
    )}>
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={equipment.imageUrl} 
          alt={equipment.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge 
          className={cn(
            "absolute top-3 right-3 shadow-lg",
            equipment.isPacked 
              ? "bg-success text-success-foreground" 
              : "bg-warning text-warning-foreground"
          )}
        >
          {equipment.isPacked ? (
            <><Check className="h-3 w-3 mr-1" /> Empaquetado</>
          ) : (
            <><X className="h-3 w-3 mr-1" /> Pendiente</>
          )}
        </Badge>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-1">{equipment.name}</h3>
          {equipment.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{equipment.description}</p>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => onTogglePacked(equipment.id)}
            className={cn(
              "flex-1 transition-all duration-200",
              equipment.isPacked 
                ? "bg-warning hover:bg-warning/90 text-warning-foreground" 
                : "bg-success hover:bg-success/90 text-success-foreground"
            )}
          >
            {equipment.isPacked ? "Desempaquetar" : "Empaquetar"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(equipment.id)}
            className="border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
