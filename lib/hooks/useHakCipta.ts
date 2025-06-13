import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { HakCiptaSchema } from '@/lib/validations/hak-cipta';
import { Database } from '@/lib/supabase/database.types';

type HakCipta = Database["public"]["Tables"]["hak_cipta"]["Row"];

export const useHakCipta = (id?: string) => {
  const supabase = createClient();
  const [data, setData] = useState<HakCipta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ... useEffect logic remains the same ...

  const createHakCipta = async (formData: HakCiptaSchema, userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const { pencipta, ...hakCiptaDetails } = formData;

      // --- PERBAIKAN DI SINI ---
      // Konversi objek Date ke string format YYYY-MM-DD
      const submissionData = {
        ...hakCiptaDetails,
        user_id: userId,
        tanggal_diumumkan: new Date(hakCiptaDetails.tanggal_diumumkan).toISOString().split('T')[0],
      };

      const { data: newHakCipta, error: hakCiptaError } = await supabase
        .from('hak_cipta')
        .insert(submissionData) // Gunakan data yang sudah diformat
        .select()
        .single();

      if (hakCiptaError) {
        throw hakCiptaError;
      }

      if (newHakCipta) {
        const penciptaData = pencipta.map(p => ({ ...p, hak_cipta_id: newHakCipta.id }));
        const { error: penciptaError } = await supabase.from('pencipta').insert(penciptaData);

        if (penciptaError) {
          // Optional: Hapus hak_cipta yang sudah dibuat jika insert pencipta gagal
          await supabase.from('hak_cipta').delete().eq('id', newHakCipta.id);
          throw penciptaError;
        }
      }
      
      setLoading(false);
      return newHakCipta;

    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { data, loading, error, createHakCipta };
};