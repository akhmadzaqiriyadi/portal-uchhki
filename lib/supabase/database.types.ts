export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      app_settings: {
        Row: {
          id: string
          key: string
          value: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      hak_cipta: {
        Row: {
          id: string
          user_id: string
          judul: string
          produk_hasil: string
          jenis_karya: string
          sub_jenis_karya: string
          nilai_aset_karya: number | null
          kota_diumumkan: string
          tanggal_diumumkan: string
          deskripsi_karya: string
          lampiran_karya_url: string | null
          status: "draft" | "submitted" | "review" | "revisi" | "approved" | "rejected"
          bukti_transfer_url: string | null
          surat_pernyataan_url: string | null
          surat_pengalihan_url: string | null
          catatan_admin: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          judul: string
          produk_hasil: string
          jenis_karya: string
          sub_jenis_karya: string
          nilai_aset_karya?: number | null
          kota_diumumkan: string
          tanggal_diumumkan: string
          deskripsi_karya: string
          lampiran_karya_url?: string | null
          status?: "draft" | "submitted" | "review" | "revisi" | "approved" | "rejected"
          bukti_transfer_url?: string | null
          surat_pernyataan_url?: string | null
          surat_pengalihan_url?: string | null
          catatan_admin?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          judul?: string
          produk_hasil?: string
          jenis_karya?: string
          sub_jenis_karya?: string
          nilai_aset_karya?: number | null
          kota_diumumkan?: string
          tanggal_diumumkan?: string
          deskripsi_karya?: string
          lampiran_karya_url?: string | null
          status?: "draft" | "submitted" | "review" | "revisi" | "approved" | "rejected"
          bukti_transfer_url?: string | null
          surat_pernyataan_url?: string | null
          surat_pengalihan_url?: string | null
          catatan_admin?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jenis_karya_master: {
        Row: {
          id: string
          nama: string
          deskripsi: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nama: string
          deskripsi?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nama?: string
          deskripsi?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          hak_cipta_id: string | null
          title: string
          message: string
          type: "info" | "success" | "warning" | "error"
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          hak_cipta_id?: string | null
          title: string
          message: string
          type?: "info" | "success" | "warning" | "error"
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          hak_cipta_id?: string | null
          title?: string
          message?: string
          type?: "info" | "success" | "warning" | "error"
          is_read?: boolean
          created_at?: string
        }
      }
      pencipta: {
        Row: {
          id: string
          hak_cipta_id: string
          nama: string
          nik: string
          nip_nim: string | null
          email: string
          jenis_kelamin: "Laki-laki" | "Perempuan"
          no_hp: string
          fakultas: string | null
          program_studi: string | null
          kewarganegaraan: string
          negara: string
          provinsi: string
          kota: string
          kecamatan: string
          kelurahan: string
          alamat_lengkap: string
          kode_pos: string
          scan_ktp_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          hak_cipta_id: string
          nama: string
          nik: string
          nip_nim?: string | null
          email: string
          jenis_kelamin: "Laki-laki" | "Perempuan"
          no_hp: string
          fakultas?: string | null
          program_studi?: string | null
          kewarganegaraan?: string
          negara?: string
          provinsi: string
          kota: string
          kecamatan: string
          kelurahan: string
          alamat_lengkap: string
          kode_pos: string
          scan_ktp_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          hak_cipta_id?: string
          nama?: string
          nik?: string
          nip_nim?: string | null
          email?: string
          jenis_kelamin?: "Laki-laki" | "Perempuan"
          no_hp?: string
          fakultas?: string | null
          program_studi?: string | null
          kewarganegaraan?: string
          negara?: string
          provinsi?: string
          kota?: string
          kecamatan?: string
          kelurahan?: string
          alamat_lengkap?: string
          kode_pos?: string
          scan_ktp_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      status_history: {
        Row: {
          id: string
          hak_cipta_id: string
          status_from: string | null
          status_to: string
          catatan: string | null
          changed_by: string
          created_at: string
        }
        Insert: {
          id?: string
          hak_cipta_id: string
          status_from?: string | null
          status_to: string
          catatan?: string | null
          changed_by: string
          created_at?: string
        }
        Update: {
          id?: string
          hak_cipta_id?: string
          status_from?: string | null
          status_to?: string
          catatan?: string | null
          changed_by?: string
          created_at?: string
        }
      }
      sub_jenis_karya_master: {
        Row: {
          id: string
          jenis_karya_id: string
          nama: string
          deskripsi: string | null
          created_at: string
        }
        Insert: {
          id?: string
          jenis_karya_id: string
          nama: string
          deskripsi?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          jenis_karya_id?: string
          nama?: string
          deskripsi?: string | null
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: "user" | "admin"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: "user" | "admin"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: "user" | "admin"
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// === START: ADD THE FOLLOWING CODE ===
export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
// === END: ADD THE FOLLOWING CODE ===