import { useState, useEffect } from "react";
import { Equipment } from "@/types/equipment";
import { toast } from "sonner";

const STORAGE_KEY = "foto-gear-equipment";

export const useEquipment = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  // Load equipment from localStorage
  const loadEquipment = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedEquipment = JSON.parse(stored);
        setEquipment(parsedEquipment);
      }
    } catch (error) {
      console.error("Error loading equipment:", error);
      toast.error("Error al cargar el equipo");
    } finally {
      setLoading(false);
    }
  };

  // Save equipment to localStorage
  const saveEquipment = (newEquipment: Equipment[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEquipment));
      setEquipment(newEquipment);
    } catch (error) {
      console.error("Error saving equipment:", error);
      toast.error("Error al guardar el equipo");
    }
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  const addEquipment = async (
    name: string,
    description: string,
    imageUrl: string,
    category?: string
  ) => {
    try {
      const newEquipment: Equipment = {
        id: crypto.randomUUID(),
        name,
        description: description || undefined,
        imageUrl,
        isPacked: false,
        category: category || undefined,
        createdAt: Date.now(),
      };

      const updatedEquipment = [...equipment, newEquipment];
      saveEquipment(updatedEquipment);
      toast.success("Equipo agregado correctamente");
    } catch (error) {
      console.error("Error adding equipment:", error);
      toast.error("Error al agregar equipo");
    }
  };

  const togglePacked = async (id: string) => {
    try {
      const item = equipment.find((e) => e.id === id);
      if (!item) return;

      const updatedEquipment = equipment.map((e) =>
        e.id === id ? { ...e, isPacked: !e.isPacked } : e
      );

      saveEquipment(updatedEquipment);

      toast.success(
        item.isPacked ? `${item.name} desempaquetado` : `${item.name} empaquetado`
      );
    } catch (error) {
      console.error("Error toggling packed status:", error);
      toast.error("Error al actualizar el estado");
    }
  };

  const deleteEquipment = async (id: string) => {
    try {
      const item = equipment.find((e) => e.id === id);

      const updatedEquipment = equipment.filter((e) => e.id !== id);
      saveEquipment(updatedEquipment);

      if (item) {
        toast.success(`${item.name} eliminado`);
      }
    } catch (error) {
      console.error("Error deleting equipment:", error);
      toast.error("Error al eliminar equipo");
    }
  };

  return {
    equipment,
    loading,
    addEquipment,
    togglePacked,
    deleteEquipment,
    refreshEquipment: loadEquipment,
  };
};
