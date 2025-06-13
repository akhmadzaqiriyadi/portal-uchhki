'use client'

import { useEffect, useState } from 'react'
// --- 1. IMPORT SubmitHandler ---
import { useForm, useFieldArray, FormProvider, Controller, SubmitHandler } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { hakCiptaSchema, HakCiptaSchema } from '@/lib/validations/hak-cipta'
import { useAuth } from '@/lib/hooks/useAuth'
import { useHakCipta } from '@/lib/hooks/useHakCipta'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '../ui/datepicker'
import PenciptaForm from './PenciptaForm'
import FileUpload from './FileUpload'


interface JenisKarya { id: string; nama: string; }
interface SubJenisKarya { id: string; nama: string; jenis_karya_id: string; }

export default function HakCiptaForm() {
    const router = useRouter()
    const { user } = useAuth()
    const { createHakCipta } = useHakCipta()

    const [jenisKaryaList, setJenisKaryaList] = useState<JenisKarya[]>([])
    const [subJenisKaryaList, setSubJenisKaryaList] = useState<SubJenisKarya[]>([])
    const [filteredSubJenisKarya, setFilteredSubJenisKarya] = useState<SubJenisKarya[]>([])
    const [masterDataLoading, setMasterDataLoading] = useState(true)

    const methods = useForm<HakCiptaSchema>({
        resolver: zodResolver(hakCiptaSchema),
        defaultValues: {
            judul: '',
            produk_hasil: '',
            kota_diumumkan: '',
            deskripsi_karya: '',
            pencipta: [{
                nama: '', nik: '', email: '', jenis_kelamin: 'Laki-laki', no_hp: '',
                kewarganegaraan: 'Indonesia', negara: 'Indonesia', provinsi: '', kota: '',
                kecamatan: '', kelurahan: '', alamat_lengkap: '', kode_pos: '', scan_ktp_url: '',
            }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "pencipta"
    });

    const selectedJenisKaryaId = methods.watch('jenis_karya')

    useEffect(() => {
        const fetchMasterData = async () => {
          try {
            setMasterDataLoading(true)
            const response = await fetch('/api/master-data')
            if (!response.ok) throw new Error('Gagal memuat data master')
            const data = await response.json()
            setJenisKaryaList(data.jenisKarya)
            setSubJenisKaryaList(data.subJenisKarya)
          } catch (error) {
            console.error("Gagal mengambil master data:", error)
          } finally {
            setMasterDataLoading(false)
          }
        }
        fetchMasterData()
    }, [])

    useEffect(() => {
        if (selectedJenisKaryaId) {
            const filtered = subJenisKaryaList.filter(
                (sub) => sub.jenis_karya_id === selectedJenisKaryaId
            )
            setFilteredSubJenisKarya(filtered)
            methods.setValue('sub_jenis_karya', '')
        } else {
            setFilteredSubJenisKarya([])
        }
    }, [selectedJenisKaryaId, subJenisKaryaList, methods])

    // --- 2. Tambahkan tipe eksplisit 'SubmitHandler<HakCiptaSchema>' di sini ---
    const onSubmit: SubmitHandler<HakCiptaSchema> = async (data) => {
        if (!user) {
            alert("Anda harus login untuk membuat pendaftaran.")
            return
        }
        
        const newHakCipta = await createHakCipta(data, user.id)

        if (newHakCipta) {
            alert("Pendaftaran berhasil dibuat!")
            router.push('/user/pendaftaran')
            router.refresh()
        } else {
            alert("Terjadi kesalahan saat membuat pendaftaran. Periksa kembali semua isian Anda.")
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
                {/* Card Informasi Hak Cipta */}
                <Card>
                    <CardHeader><CardTitle>1. Informasi Hak Cipta</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="judul">Judul Karya</Label>
                            <Input id="judul" {...methods.register('judul')} />
                            {methods.formState.errors.judul && <p className="text-red-500 text-sm">{methods.formState.errors.judul.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="produk_hasil">Produk Hasil</Label>
                            <Input id="produk_hasil" {...methods.register('produk_hasil')} />
                            {methods.formState.errors.produk_hasil && <p className="text-red-500 text-sm">{methods.formState.errors.produk_hasil.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Jenis Karya</Label>
                                <Controller control={methods.control} name="jenis_karya" render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={masterDataLoading}>
                                        <SelectTrigger><SelectValue placeholder={masterDataLoading ? "Memuat..." : "Pilih Jenis Karya"} /></SelectTrigger>
                                        <SelectContent>{jenisKaryaList.map((item) => (<SelectItem key={item.id} value={item.id}>{item.nama}</SelectItem>))}</SelectContent>
                                    </Select>
                                )} />
                                {methods.formState.errors.jenis_karya && <p className="text-red-500 text-sm">{methods.formState.errors.jenis_karya.message}</p>}
                            </div>
                            <div>
                                <Label>Sub-Jenis Karya</Label>
                                <Controller control={methods.control} name="sub_jenis_karya" render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value} disabled={!selectedJenisKaryaId}>
                                        <SelectTrigger><SelectValue placeholder={!selectedJenisKaryaId ? "Pilih jenis karya dulu" : "Pilih Sub-Jenis"} /></SelectTrigger>
                                        <SelectContent>{filteredSubJenisKarya.map((item) => (<SelectItem key={item.id} value={item.id}>{item.nama}</SelectItem>))}</SelectContent>
                                    </Select>
                                )}/>
                                {methods.formState.errors.sub_jenis_karya && <p className="text-red-500 text-sm">{methods.formState.errors.sub_jenis_karya.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="kota_diumumkan">Kota Diumumkan</Label>
                                <Input id="kota_diumumkan" {...methods.register('kota_diumumkan')} />
                                {methods.formState.errors.kota_diumumkan && <p className="text-red-500 text-sm">{methods.formState.errors.kota_diumumkan.message}</p>}
                            </div>
                            <div>
                                <Label>Tanggal Diumumkan</Label>
                                <Controller control={methods.control} name="tanggal_diumumkan" render={({ field }) => (<DatePicker value={field.value} onChange={field.onChange} />)} />
                                {methods.formState.errors.tanggal_diumumkan && <p className="text-red-500 text-sm">{methods.formState.errors.tanggal_diumumkan.message}</p>}
                            </div>
                        </div>
                         <div>
                            <Label htmlFor="nilai_aset_karya">Nilai Aset Karya (Rp) (Opsional)</Label>
                            <Input type="number" id="nilai_aset_karya" {...methods.register('nilai_aset_karya')} />
                            {methods.formState.errors.nilai_aset_karya && <p className="text-red-500 text-sm">{methods.formState.errors.nilai_aset_karya.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="deskripsi_karya">Deskripsi Karya</Label>
                            <Textarea id="deskripsi_karya" {...methods.register('deskripsi_karya')} />
                            {methods.formState.errors.deskripsi_karya && <p className="text-red-500 text-sm">{methods.formState.errors.deskripsi_karya.message}</p>}
                        </div>
                    </CardContent>
                </Card>

                {/* Bagian 2: Data Pencipta */}
                <Card>
                    <CardHeader><CardTitle>2. Data Pencipta</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        {fields.map((field, index) => (<PenciptaForm key={field.id} index={index} remove={remove} />))}
                        <Button type="button" variant="outline" onClick={() => append({
                            nama: '', nik: '', email: '', jenis_kelamin: 'Laki-laki', no_hp: '',
                            kewarganegaraan: 'Indonesia', negara: 'Indonesia', provinsi: '', kota: '',
                            kecamatan: '', kelurahan: '', alamat_lengkap: '', kode_pos: '', scan_ktp_url: ''
                        })}>
                            Tambah Pencipta
                        </Button>
                    </CardContent>
                </Card>

                {/* Bagian 3: Lampiran */}
                <Card>
                    <CardHeader><CardTitle>3. Lampiran & Berkas Pendukung</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Lampiran Karya (PDF, Video/Link)</Label>
                            <FileUpload bucket="hki-documents" onUpload={(url) => methods.setValue('lampiran_karya_url', url)} />
                            <Input type="hidden" {...methods.register('lampiran_karya_url')} />
                        </div>
                        <div className="space-y-2">
                            <Label>Bukti Transfer Pembayaran</Label>
                            <FileUpload bucket="hki-documents" onUpload={(url) => methods.setValue('bukti_transfer_url', url)} />
                            <Input type="hidden" {...methods.register('bukti_transfer_url')} />
                        </div>
                        <div className="space-y-2">
                            <Label>Surat Pernyataan (Upload PDF dengan Materai)</Label>
                            <FileUpload bucket="hki-documents" onUpload={(url) => methods.setValue('surat_pernyataan_url', url)} />
                            <Input type="hidden" {...methods.register('surat_pernyataan_url')} />
                        </div>
                        <div className="space-y-2">
                            <Label>Surat Pengalihan Hak Cipta (Upload PDF dengan Materai)</Label>
                            <FileUpload bucket="hki-documents" onUpload={(url) => methods.setValue('surat_pengalihan_url', url)} />
                            <Input type="hidden" {...methods.register('surat_pengalihan_url')} />
                        </div>
                    </CardContent>
                </Card>

                {/* Tombol Submit */}
                <div className="flex justify-end">
                    <Button type="submit" disabled={methods.formState.isSubmitting}>
                        {methods.formState.isSubmitting ? 'Menyimpan...' : 'Simpan Pendaftaran'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}