-- Add RLS policies for article-images bucket
-- First, drop any existing policies with the same name to avoid conflicts
DROP POLICY IF EXISTS "Public read access for article images" ON storage.objects;
DROP POLICY IF EXISTS "Providers can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "Providers can update their article images" ON storage.objects;
DROP POLICY IF EXISTS "Providers can delete their article images" ON storage.objects;

-- Create new policies
CREATE POLICY "Public read access for article images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

CREATE POLICY "Providers can upload article images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'article-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Providers can update their article images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'article-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Providers can delete their article images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'article-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);