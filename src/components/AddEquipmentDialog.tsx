import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddEquipmentDialogProps {
  onAdd: (name: string, description: string, imageUrl: string, category?: string) => void;
}

export const AddEquipmentDialog = ({ onAdd }: AddEquipmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La imagen debe ser menor a 5MB");
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }

    if (!imageFile) {
      toast.error("La imagen es obligatoria");
      return;
    }

    setUploading(true);

    try {
      // Convert image to base64 for local storage
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });

      const imageUrl = await base64Promise;

      await onAdd(name.trim(), description.trim(), imageUrl, category.trim() || undefined);

      // Reset form
      setName("");
      setDescription("");
      setCategory("");
      setImageFile(null);
      setImagePreview(null);
      setOpen(false);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Error al procesar la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground text-xs md:text-sm h-8 md:h-10 px-2 md:px-4">
          <Plus className="h-4 w-4 md:mr-2 md:h-5 md:w-5" />
          <span className="hidden md:inline">Agregar Equipo</span>
          <span className="md:hidden ml-1">Agregar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Equipo</DialogTitle>
          <DialogDescription>
            Completa los datos de tu equipo fotográfico
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              placeholder="ej. Canon EOS R5"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              placeholder="ej. Cámara principal para eventos"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría (opcional)</Label>
            <Input
              id="category"
              placeholder="ej. Cámaras, Lentes, Iluminación"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              maxLength={50}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Foto *</Label>
            <div className="flex flex-col gap-3">
              <label htmlFor="image" className="cursor-pointer">
                <div className="border-2 border-dashed border-input rounded-lg p-6 hover:border-accent transition-colors text-center">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Haz clic para subir una foto
                      </p>
                    </div>
                  )}
                </div>
              </label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subiendo...
                </>
              ) : (
                "Agregar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
