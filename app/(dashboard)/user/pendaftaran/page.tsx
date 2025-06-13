import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PendaftaranTable from '@/components/tabels/PendaftaranTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function PendaftaranPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: pendaftaran, error } = await supabase
    .from('hak_cipta')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    // Handle error appropriately
    console.error(error);
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pendaftaran Hak Cipta Anda</h1>
        <Button asChild>
          <Link href="/user/pendaftaran/baru">Buat Pendaftaran Baru</Link>
        </Button>
      </div>
      <PendaftaranTable data={pendaftaran || []} />
    </div>
  );
}