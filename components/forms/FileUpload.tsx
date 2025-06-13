'use client';
import { useState } from 'react';
import { useFileUpload } from '@/lib/hooks/useFileUpload';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';

interface FileUploadProps {
  bucket: string;
  onUpload: (url: string) => void;
}

export default function FileUpload({ bucket, onUpload }: FileUploadProps) {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const { isUploading, error, handleUpload } = useFileUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = async () => {
    if (file && user) {
      const url = await handleUpload(file, bucket, user.id);
      if (url) {
        onUpload(url);
      }
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={onButtonClick} disabled={isUploading || !file}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}