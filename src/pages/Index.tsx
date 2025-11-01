import { useState } from "react";
import { FilterType } from "@/types/equipment";
import { EquipmentCard } from "@/components/EquipmentCard";
import { AddEquipmentDialog } from "@/components/AddEquipmentDialog";
import { StatusFilter } from "@/components/StatusFilter";
import { Camera, Package } from "lucide-react";
import { useEquipment } from "@/hooks/useEquipment";

const Index = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const { equipment, loading, addEquipment, togglePacked, deleteEquipment } = useEquipment();

  const filteredEquipment = equipment.filter(item => {
    if (filter === 'packed') return item.isPacked;
    if (filter === 'unpacked') return !item.isPacked;
    return true;
  });

  const counts = {
    all: equipment.length,
    packed: equipment.filter(e => e.isPacked).length,
    unpacked: equipment.filter(e => !e.isPacked).length,
  };

  const packingProgress = counts.all > 0 
    ? Math.round((counts.packed / counts.all) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4 animate-pulse">
            <Camera className="h-8 w-8 text-accent" />
          </div>
          <p className="text-muted-foreground">Cargando equipo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Camera className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Mi Equipo Fotográfico</h1>
                <p className="text-sm text-muted-foreground">Gestiona tu inventario</p>
              </div>
            </div>
            <AddEquipmentDialog onAdd={addEquipment} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {equipment.length > 0 ? (
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-accent" />
                  <h2 className="text-lg font-semibold">Progreso de Empaquetado</h2>
                </div>
                <span className="text-2xl font-bold text-accent">{packingProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-success h-full transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${packingProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {counts.packed} de {counts.all} elementos empaquetados
              </p>
            </div>

            {/* Filters */}
            <StatusFilter 
              currentFilter={filter} 
              onFilterChange={setFilter}
              counts={counts}
            />

            {/* Equipment Grid */}
            {filteredEquipment.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map((item) => (
                  <EquipmentCard
                    key={item.id}
                    equipment={item}
                    onTogglePacked={togglePacked}
                    onDelete={deleteEquipment}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  No hay equipos en esta categoría
                </p>
              </div>
            )}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6">
              <Camera className="h-10 w-10 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Comienza tu inventario</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Agrega tu equipo fotográfico para llevar un control de lo que empaquetas antes y después de cada sesión
            </p>
            <AddEquipmentDialog onAdd={addEquipment} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
