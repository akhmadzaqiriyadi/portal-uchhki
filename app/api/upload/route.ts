import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { uploadFile } from '@/lib/supabase/storage';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string;

    if (!file || !bucket) {
      return NextResponse.json({ error: 'File and bucket are required' }, { status: 400 });
    }

    const publicUrl = await uploadFile(file, bucket, user.id);
    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}