import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface UploadTaskFileProps {
  taskId: string;
}

export default function UploadTaskFile({ taskId }: UploadTaskFileProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:5555/tasks/${taskId}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return (
    <form onSubmit={handleFileUpload} className="mt-4">
      <input 
        type="file" 
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)} 
        className="block mb-3"
      />
      <button 
        type="submit" 
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Upload File
      </button>
    </form>
  );
}
