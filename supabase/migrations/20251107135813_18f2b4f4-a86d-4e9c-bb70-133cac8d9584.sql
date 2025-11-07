-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name)
VALUES ('article-images', 'article-images');

-- Create policy for users to view article images
CREATE POLICY "Article images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

-- Create policy for providers to upload their article images
CREATE POLICY "Providers can upload article images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'article-images' 
  AND auth.uid() IN (
    SELECT id FROM profiles WHERE user_type = 'provider'
  )
);

-- Create policy for providers to update their article images
CREATE POLICY "Providers can update their article images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'article-images'
  AND auth.uid() IN (
    SELECT id FROM profiles WHERE user_type = 'provider'
  )
);

-- Create policy for providers to delete their article images
CREATE POLICY "Providers can delete their article images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'article-images'
  AND auth.uid() IN (
    SELECT id FROM profiles WHERE user_type = 'provider'
  )
);