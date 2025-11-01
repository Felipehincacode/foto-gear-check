import { useState } from "react";
import { Link } from "react-router-dom";
import { FilterType } from "@/types/equipment";
import { EquipmentCard } from "@/components/EquipmentCard";
import { StatusFilter } from "@/components/StatusFilter";
import { ArrowLeft, Camera, Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEquipment } from "@/hooks/useEquipment";

const ManageEquipment = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const { equipment, loading, togglePacked, deleteEquipment } = useEquipment();

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
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-3 py-4 md:px-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Camera className="h-6 w-6 text-accent" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                Inventario Fotográfico
              </h1>
            </div>
            <div></div> {/* Spacer */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-3 py-4 md:px-4 md:py-8">
        {equipment.length > 0 ? (
          <div className="space-y-3 md:space-y-6">
            {/* Progress Card */}
            <div className="bg-card rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <Package className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                  <h2 className="text-sm md:text-lg font-semibold">Estado del Equipo</h2>
                </div>
                <span className="text-lg md:text-2xl font-bold text-accent">{packingProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 md:h-3 overflow-hidden">
                <div
                  className="bg-success h-full transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${packingProgress}%` }}
                />
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1.5 md:mt-2">
                {counts.packed} empacados • {counts.unpacked} en uso
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
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
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
              <div className="text-center py-8 md:py-12">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted mb-3 md:mb-4">
                  <Package className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground" />
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  No hay equipos en esta categoría
                </p>
              </div>
            )}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-12 md:py-16 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/10 mb-4 md:mb-6">
              <Camera className="h-8 w-8 md:h-10 md:w-10 text-accent" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">No hay equipo registrado</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto">
              Agrega tu primer elemento para comenzar a gestionar su estado
            </p>
            <Link to="/agregar">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Equipo
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageEquipment;