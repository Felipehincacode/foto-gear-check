-- Create equipment table
CREATE TABLE IF NOT EXISTS public.equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  is_packed BOOLEAN NOT NULL DEFAULT false,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;

-- Create policies for equipment table
CREATE POLICY "Users can view their own equipment"
  ON public.equipment
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own equipment"
  ON public.equipment
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own equipment"
  ON public.equipment
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own equipment"
  ON public.equipment
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create storage bucket for equipment images
INSERT INTO storage.buckets (id, name, public)
VALUES ('equipment-images', 'equipment-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Users can upload their own images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'equipment-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own images"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'equipment-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own images"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'equipment-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'equipment-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );