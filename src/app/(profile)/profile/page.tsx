'use client';

import { IoPersonOutline } from 'react-icons/io5'; 
import { useSession } from 'next-auth/react';
import useGetByIdEmployee from '@/hooks/profile/useGetByIdEmployee';
import { number } from 'zod';

const ProfilePage = () => {
  
  const { data: session } = useSession();
  const employeeId = session?.user?.employeeId; 

 
  const { employeeById: employeeData } = useGetByIdEmployee( {employeeId} );

 
  if (!employeeData) {
    return <div>Loading...</div>; 
  }


  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3x3 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3x3 font-bold mb-6">Cuenta</h1>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Perfil</h2>
            <p className="text-gray-600 mb-4">
            Esta es tu información pública de perfil. Se utiliza para identificarte en los servicios de la empresa. 
            Puedes actualizar tu información para mantenerla actualizada y precisa. 
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                  <IoPersonOutline size={48} className="text-black" />
                </div>
                <span className="text-gray-700">Imagen de perfil</span>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                Cambiar
              </button>
            </div>
            <ProfileField
              label="Nombre de usuario"
              value={`${employeeData.Name} ${employeeData.Surname1} ${employeeData.Surname2}`}
            />
            <ProfileField label="Teléfono" value={employeeData.CellPhone} />
            <ProfileField label="Correo electrónico" value={employeeData.Email} />
            <ProfileField label="Fecha nacimiento" value={employeeData.Birthdate} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700">{label}</span>
    <div className="flex items-center space-x-4">
      <span className="text-gray-500">{value}</span>
      <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Cambiar</button>
    </div>
  </div>
);

export default ProfilePage;
