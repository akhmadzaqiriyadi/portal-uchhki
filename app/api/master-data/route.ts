import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  try {
    const { data: jenisKarya, error: jenisKaryaError } = await supabase
      .from('jenis_karya_master')
      .select('id, nama')

    if (jenisKaryaError) {
      throw jenisKaryaError
    }

    const { data: subJenisKarya, error: subJenisKaryaError } = await supabase
      .from('sub_jenis_karya_master')
      .select('id, nama, jenis_karya_id')

    if (subJenisKaryaError) {
      throw subJenisKaryaError
    }

    return NextResponse.json({ jenisKarya, subJenisKarya })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal mengambil master data' },
      { status: 500 }
    )
  }
}