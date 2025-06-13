import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { PlusCircle, FileText, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PendaftaranTable } from '@/components/tables/PendaftaranTable';
import { columns } from '@/components/tables/columns';
import type { Database } from '@/lib/supabase/database.types';

// Tipe data untuk pendaftaran HKI
type HakCipta = Database["public"]["Tables"]["hak_cipta"]["Row"];

// Fungsi untuk mengambil data dari Supabase di sisi server
async function getPendaftaranData(): Promise<{ pendaftaran: HakCipta[], stats: Record<string, number> }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { pendaftaran: [], stats: {} };
  }

  const { data, error } = await supabase
    .from('hak_cipta')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pendaftaran:', error);
    return { pendaftaran: [], stats: {} };
  }

  // Hitung statistik untuk kartu ringkasan
  const stats = {
    total: data.length,
    dalamProses: data.filter(p => ['submitted', 'review', 'revisi'].includes(p.status)).length,
    disetujui: data.filter(p => p.status === 'approved').length,
  };

  return { pendaftaran: data, stats };
}

export default async function UserDashboardPage() {
  const { pendaftaran, stats } = await getPendaftaranData();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Saya</h1>
          <p className="text-muted-foreground">
            Kelola semua pendaftaran Hak Cipta Anda di sini.
          </p>
        </div>
        <Link href="/user/pendaftaran/baru">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Daftarkan Karya Baru
          </Button>
        </Link>
      </div>

      {/* Kartu Statistik */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pendaftaran</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dalam Proses</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.dalamProses || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Telah Disetujui</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.disetujui || 0}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabel Riwayat Pendaftaran */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pendaftaran</CardTitle>
          <CardDescription>
            Berikut adalah daftar semua pendaftaran yang telah Anda ajukan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PendaftaranTable columns={columns} data={pendaftaran} />
        </CardContent>
      </Card>
    </div>
  )
}