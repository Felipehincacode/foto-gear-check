import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, Loader2, ArrowLeft, Camera } from "lucide-react";
import { toast } from "sonner";
import { useEquipment } from "@/hooks/useEquipment";

const AddEquipment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { addEquipment } = useEquipment();

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

      await addEquipment(name.trim(), description.trim(), imageUrl, category.trim() || undefined);

      // Reset form
      setName("");
      setDescription("");
      setCategory("");
      setImageFile(null);
      setImagePreview(null);

      toast.success("Equipo agregado correctamente");
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Error al procesar la imagen");
    } finally {
      setUploading(false);
    }
  };

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
      <main className="container max-w-2xl mx-auto px-3 py-8 md:px-4">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Agregar Nuevo Equipo</h2>
            <p className="text-muted-foreground">Registra un nuevo elemento en tu inventario</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex gap-3 pt-4">
              <Link to="/" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Agregando...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEquipment;