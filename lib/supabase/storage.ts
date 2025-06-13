import { createClient } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (file: File, bucket: string, userId: string) => {
  const supabase = createClient();
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const filePath = `${userId}/${fileName}`;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};