import * as z from 'zod';

export const penciptaSchema = z.object({
  nama: z.string().min(3, 'Nama minimal 3 karakter'),
  nik: z.string().length(16, 'NIK harus 16 digit'),
  nip_nim: z.string().optional().nullable(),
  email: z.string().email('Email tidak valid'),
  jenis_kelamin: z.enum(['Laki-laki', 'Perempuan']),
  no_hp: z.string().min(10, 'Nomor HP minimal 10 digit'),
  fakultas: z.string().optional().nullable(),
  program_studi: z.string().optional().nullable(),
  kewarganegaraan: z.string().min(1, 'Kewarganegaraan harus diisi'),
  negara: z.string().min(1, 'Negara harus diisi'),
  provinsi: z.string().min(1, 'Provinsi harus diisi'),
  kota: z.string().min(1, 'Kota harus diisi'),
  kecamatan: z.string().min(1, 'Kecamatan harus diisi'),
  kelurahan: z.string().min(1, 'Kelurahan harus diisi'),
  alamat_lengkap: z.string().min(10, 'Alamat lengkap minimal 10 karakter'),
  kode_pos: z.string().length(5, 'Kode pos harus 5 digit'),
  scan_ktp_url: z.string().min(1, 'Scan KTP harus diunggah'),
});

export type PenciptaSchema = z.infer<typeof penciptaSchema>;