import * as z from 'zod';
import { penciptaSchema } from './pencipta';

export const hakCiptaSchema = z.object({
  judul: z.string().min(3, 'Judul minimal 3 karakter'),
  produk_hasil: z.string().min(1, 'Produk hasil harus diisi'),
  jenis_karya: z.string().min(1, 'Jenis karya harus diisi'),
  sub_jenis_karya: z.string().min(1, 'Sub-jenis karya harus diisi'),
  
  // --- PERBAIKAN DI SINI ---
  nilai_aset_karya: z.preprocess(
    (val) => {
      // Jika input adalah string kosong, anggap sebagai null
      if (val === '') return null;
      // Jika sudah angka, biarkan
      if (typeof val === 'number') return val;
      // Jika string, coba ubah ke angka. Jika gagal, hasilnya akan NaN 
      // dan akan gagal divalidasi oleh z.number() di bawah.
      if (typeof val === 'string') return parseFloat(val);
      // Kembalikan nilai apa adanya untuk tipe lain (undefined, null)
      return val;
    },
    // Tambahkan pesan error untuk tipe yang tidak valid
    z.number({ invalid_type_error: "Nilai aset harus berupa angka" })
      .positive("Nilai aset harus angka positif")
      .optional()
      .nullable()
  ),
  
  kota_diumumkan: z.string().min(3, 'Kota harus diisi'),
  tanggal_diumumkan: z.date({
    required_error: 'Tanggal harus diisi.',
  }),
  deskripsi_karya: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  pencipta: z.array(penciptaSchema).min(1, 'Minimal ada satu pencipta'),

  lampiran_karya_url: z.string().optional().nullable(),
  bukti_transfer_url: z.string().optional().nullable(),
  surat_pernyataan_url: z.string().optional().nullable(),
  surat_pengalihan_url: z.string().optional().nullable(),
});

export type HakCiptaSchema = z.infer<typeof hakCiptaSchema>;