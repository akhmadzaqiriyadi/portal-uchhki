// ... (imports tidak berubah)
import { useFormContext, Controller, UseFieldArrayRemove } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from "./FileUpload";
import { HakCiptaSchema } from "@/lib/validations/hak-cipta";

interface PenciptaFormProps {
  index: number;
  remove: UseFieldArrayRemove;
}


export default function PenciptaForm({ index, remove }: PenciptaFormProps) {
  const { register, control, formState: { errors }, setValue } = useFormContext<HakCiptaSchema>();
  const fieldError = errors.pencipta?.[index];

  const handleKtpUpload = (url: string) => {
    setValue(`pencipta.${index}.scan_ktp_url`, url, { shouldValidate: true });
  }

  return (
    <Card className="border-border border relative">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pencipta #{index + 1}</CardTitle>
          {index > 0 && (
            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ... (field nama sampai no_hp tidak berubah) ... */}
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.nama`}>Nama Lengkap</Label>
          <Input id={`pencipta.${index}.nama`} {...register(`pencipta.${index}.nama`)} />
          {fieldError?.nama && <p className="text-sm text-red-500">{fieldError.nama.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.nik`}>NIK</Label>
          <Input id={`pencipta.${index}.nik`} {...register(`pencipta.${index}.nik`)} />
          {fieldError?.nik && <p className="text-sm text-red-500">{fieldError.nik.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.nip_nim`}>NIP/NIM (Opsional)</Label>
          <Input id={`pencipta.${index}.nip_nim`} {...register(`pencipta.${index}.nip_nim`)} />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.email`}>Email</Label>
          <Input type="email" id={`pencipta.${index}.email`} {...register(`pencipta.${index}.email`)} />
          {fieldError?.email && <p className="text-sm text-red-500">{fieldError.email.message}</p>}
        </div>
        <div className="space-y-1">
            <Label>Jenis Kelamin</Label>
            <Controller
                control={control}
                name={`pencipta.${index}.jenis_kelamin`}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
            {fieldError?.jenis_kelamin && <p className="text-sm text-red-500">{fieldError.jenis_kelamin.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.no_hp`}>No. HP / WhatsApp</Label>
          <Input id={`pencipta.${index}.no_hp`} {...register(`pencipta.${index}.no_hp`)} />
          {fieldError?.no_hp && <p className="text-sm text-red-500">{fieldError.no_hp.message}</p>}
        </div>
        {/* Tambahkan field Fakultas & Prodi (Opsional) */}
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.fakultas`}>Fakultas (Opsional)</Label>
          <Input id={`pencipta.${index}.fakultas`} {...register(`pencipta.${index}.fakultas`)} />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.program_studi`}>Program Studi (Opsional)</Label>
          <Input id={`pencipta.${index}.program_studi`} {...register(`pencipta.${index}.program_studi`)} />
        </div>
        
        {/* Tambahkan field Kewarganegaraan & Negara */}
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.kewarganegaraan`}>Kewarganegaraan</Label>
          <Input id={`pencipta.${index}.kewarganegaraan`} {...register(`pencipta.${index}.kewarganegaraan`)} />
          {fieldError?.kewarganegaraan && <p className="text-sm text-red-500">{fieldError.kewarganegaraan.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.negara`}>Negara</Label>
          <Input id={`pencipta.${index}.negara`} {...register(`pencipta.${index}.negara`)} />
          {fieldError?.negara && <p className="text-sm text-red-500">{fieldError.negara.message}</p>}
        </div>

        {/* ... (field alamat sampai KTP tidak berubah) ... */}
        <div className="col-span-full space-y-1">
          <Label htmlFor={`pencipta.${index}.alamat_lengkap`}>Alamat Lengkap</Label>
          <Input id={`pencipta.${index}.alamat_lengkap`} {...register(`pencipta.${index}.alamat_lengkap`)} />
          {fieldError?.alamat_lengkap && <p className="text-sm text-red-500">{fieldError.alamat_lengkap.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.provinsi`}>Provinsi</Label>
          <Input id={`pencipta.${index}.provinsi`} {...register(`pencipta.${index}.provinsi`)} />
          {fieldError?.provinsi && <p className="text-sm text-red-500">{fieldError.provinsi.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.kota`}>Kota/Kabupaten</Label>
          <Input id={`pencipta.${index}.kota`} {...register(`pencipta.${index}.kota`)} />
          {fieldError?.kota && <p className="text-sm text-red-500">{fieldError.kota.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.kecamatan`}>Kecamatan</Label>
          <Input id={`pencipta.${index}.kecamatan`} {...register(`pencipta.${index}.kecamatan`)} />
          {fieldError?.kecamatan && <p className="text-sm text-red-500">{fieldError.kecamatan.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.kelurahan`}>Kelurahan/Desa</Label>
          <Input id={`pencipta.${index}.kelurahan`} {...register(`pencipta.${index}.kelurahan`)} />
          {fieldError?.kelurahan && <p className="text-sm text-red-500">{fieldError.kelurahan.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor={`pencipta.${index}.kode_pos`}>Kode Pos</Label>
          <Input id={`pencipta.${index}.kode_pos`} {...register(`pencipta.${index}.kode_pos`)} />
          {fieldError?.kode_pos && <p className="text-sm text-red-500">{fieldError.kode_pos.message}</p>}
        </div>
        <div className="col-span-full space-y-1">
            <Label>Scan KTP (PDF)</Label>
            <FileUpload bucket="hki-documents" onUpload={handleKtpUpload} />
            <Input type="hidden" {...register(`pencipta.${index}.scan_ktp_url`)} />
            {fieldError?.scan_ktp_url && <p className="text-sm text-red-500">{fieldError.scan_ktp_url.message}</p>}
        </div>
      </CardContent>
    </Card>
  );
}