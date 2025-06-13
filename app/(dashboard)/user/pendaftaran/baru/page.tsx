import HakCiptaForm from '@/components/forms/HakCiptaForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PendaftaranBaruPage() {
  return (
    <div className="py-4 space-y-4">
      <Card>
        <CardHeader>
            <CardTitle className="text-2xl">Formulir Pendaftaran Hak Cipta Baru</CardTitle>
            <CardDescription>
                Silakan isi semua data yang diperlukan dengan benar. Bagian dengan tanda * wajib diisi.
            </CardDescription>
        </CardHeader>
      </Card>
      <HakCiptaForm />
    </div>
  );
}