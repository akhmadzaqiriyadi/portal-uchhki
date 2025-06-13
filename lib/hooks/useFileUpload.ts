import { useState } from 'react';
import { uploadFile } from '@/lib/supabase/storage';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File, bucket: string, userId: string) => {
    setIsUploading(true);
    setError(null);
    try {
      const url = await uploadFile(file, bucket, userId);
      return url;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, error, handleUpload };
};