"use client"; 
import { titleFont } from '@/config/fonts';
import React, { useState, useRef } from 'react';

interface Props {
  title: string;
}

const MaintenancePage = ({ title }: Props) => {
  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

 
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(true);
  };

  const onDragEnd = () => {
    setDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileContent(reader.result);
      };
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else if (file.type === "text/plain") {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileContent(reader.result);
      };
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else if (file.type === "text/plain") {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const handleSave = () => {
    if (uploadedFile) {
      alert(`Archivo "${uploadedFile.name}" guardado correctamente.`);
    } else {
      alert("No se ha cargado ningún archivo.");
    }
  };

  const handleDelete = () => {
    setUploadedFile(null);
    setFileContent(null);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className={`${titleFont.className} text-4xl mb-8`}>Control de Asistencia</h1>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <div
        className={`border-4 border-dashed p-4 w-[800px] h-[300px] flex items-center justify-center overflow-hidden ${
          dragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={() => setDragging(false)}
      >
        {uploadedFile ? (
          <div className="flex items-center justify-center w-full h-full">
            {uploadedFile.type.startsWith("image/") && fileContent && (
              <img
                src={fileContent as string}
                alt={uploadedFile.name}
                className="object-contain max-w-full max-h-full"
              />
            )}

            {uploadedFile.type === "text/plain" && fileContent && (
              <div className="overflow-auto w-full h-full p-2 border rounded bg-gray-50">
                <h3 className="font-bold">{uploadedFile.name}</h3>
              </div>
            )}

            {!uploadedFile.type.startsWith("image/") && uploadedFile.type !== "text/plain" && (
              <div className="p-2 border rounded">
                <h3 className="font-bold">{uploadedFile.name}</h3>
                <p>Tipo de archivo: {uploadedFile.type}</p>
                <p>Tamaño: {(uploadedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Arrastra y suelta el archivo aquí</p>
        )}
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={openFileDialog}
          className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
        >
          Elegir Archivo
        </button>
        <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
          Guardar
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default MaintenancePage;
