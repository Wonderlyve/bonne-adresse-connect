-- Complete cleanup of article-images bucket with only existing columns

-- First, delete all objects in the bucket
DELETE FROM storage.objects WHERE bucket_id = 'article-images';

-- Drop all existing policies
DROP POLICY IF EXISTS "Anyone can view article images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own article images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own article images" ON storage.objects;
DROP POLICY IF EXISTS "Article images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for article images" ON storage.objects;
DROP POLICY IF EXISTS "Providers can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "Providers can update their article images" ON storage.objects;
DROP POLICY IF EXISTS "Providers can delete their article images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view article images" ON storage.objects;

-- Delete the bucket completely
DELETE FROM storage.buckets WHERE id = 'article-images';

-- Recreate the bucket with ONLY id and name (the only columns that exist)
INSERT INTO storage.buckets (id, name)
VALUES ('article-images', 'article-images');

-- Recreate clean, simple RLS policies
CREATE POLICY "Public can view article images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can upload article images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'article-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their article images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'article-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their article images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'article-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);