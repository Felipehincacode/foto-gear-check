import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Equipment } from "@/types/equipment";
import { toast } from "sonner";

export const useEquipment = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from("equipment")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const mappedEquipment: Equipment[] = (data || []).map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description || undefined,
        imageUrl: item.image_url,
        isPacked: item.is_packed,
        category: item.category || undefined,
        createdAt: new Date(item.created_at).getTime(),
      }));

      setEquipment(mappedEquipment);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      toast.error("Error al cargar el equipo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const addEquipment = async (
    name: string,
    description: string,
    imageUrl: string,
    category?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Debes iniciar sesión para agregar equipo");
        return;
      }

      const { error } = await supabase.from("equipment").insert({
        user_id: user.id,
        name,
        description: description || null,
        image_url: imageUrl,
        is_packed: false,
        category: category || null,
      });

      if (error) throw error;

      await fetchEquipment();
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

      const { error } = await supabase
        .from("equipment")
        .update({ is_packed: !item.isPacked })
        .eq("id", id);

      if (error) throw error;

      setEquipment(
        equipment.map((e) =>
          e.id === id ? { ...e, isPacked: !e.isPacked } : e
        )
      );

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
      
      const { error } = await supabase
        .from("equipment")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setEquipment(equipment.filter((e) => e.id !== id));
      
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
    refreshEquipment: fetchEquipment,
  };
};
