import { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-3 py-4 md:px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Camera className="h-6 w-6 md:h-8 md:w-8 text-accent" />
              </div>
              <h1 className="text-xl md:text-3xl font-bold text-foreground">
                Inventario Fotográfico
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-3 py-8 md:px-4 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Agregar Equipo */}
          <Link to="/agregar">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                  <Plus className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Agregar Equipo</CardTitle>
                <CardDescription>
                  Registra nuevos elementos a tu inventario
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Gestionar Estado */}
          <Link to="/gestionar">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Gestionar Estado</CardTitle>
                <CardDescription>
                  Marca elementos como empacados o en uso
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;