-- Ensure article-images bucket exists with proper setup
DO $$ 
BEGIN
  -- Check if bucket exists, if not create it
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'article-images') THEN
    INSERT INTO storage.buckets (id, name)
    VALUES ('article-images', 'article-images');
  END IF;
END $$;

-- Ensure all necessary RLS policies exist
DROP POLICY IF EXISTS "Public read access for article images" ON storage.objects;
DROP POLICY IF EXISTS "Providers can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "Providers can update their article images" ON storage.objects;
DROP POLICY IF EXISTS "Providers can delete their article images" ON storage.objects;

-- Public read access
CREATE POLICY "Public read access for article images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

-- Provider upload access
CREATE POLICY "Providers can upload article images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'article-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Provider update access
CREATE POLICY "Providers can update their article images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'article-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Provider delete access
CREATE POLICY "Providers can delete their article images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'article-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);