'use client'
import Spinner from '../../../../components/ui/spinner';
import useGetGenders from '../hooks/useGetGenders';
import useGetMaritalStatus from '../hooks/useGetMaritalStatus';
import usePostEmployee from '../hooks/usePostEmployee';

const RegisterForm = () => {

    const { genders } = useGetGenders();
    const { maritalStatus } = useGetMaritalStatus();
    const { onSubmit, register, errorMessage, mutation } = usePostEmployee();

    return (
        <form onSubmit={onSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Información Personal */}
                <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="Name" className="block text-sm font-medium text-gray-900">
                                Nombre
                            </label>
                            <input
                                type="text"
                                placeholder="Escribe tu nombre aquí"
                                id="Name"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('Name')}
                            />
                        </div>
                        <div>
                            <label htmlFor="Surname1" className="block text-sm font-medium text-gray-900">
                                Primer Apellido
                            </label>
                            <input
                                type="text"
                                placeholder="Escribe tu primer apellido aquí"
                                id="Surname1"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('Surname1')}
                            />
                        </div>
                        <div>
                            <label htmlFor="Surname2" className="block text-sm font-medium text-gray-900">
                                Segundo Apellido
                            </label>
                            <input
                                type="text"
                                placeholder="Escribe tu segundo apellido aquí"
                                id="Surname2"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('Surname2')}
                            />
                        </div>
                        <div>
                            <label htmlFor="Birthdate" className="block text-sm font-medium text-gray-900">
                                Fecha de Nacimiento
                            </label>
                            <input
                                type="date"
                                id="Birthdate"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('Birthdate')}
                            />
                        </div>
                        <div>
                            <label htmlFor="GenderId" className="block text-sm font-medium text-gray-900">
                                Género
                            </label>
                            <select
                                id="GenderId"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('GenderId')}
                            >
                                <option>Selecciona tu género</option>
                                {genders?.map((gender: { GenderId: number; Name: string }) => (
                                    <option key={gender.GenderId} value={gender.GenderId}>
                                        {gender.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="MaritalStatusId" className="block text-sm font-medium text-gray-900">
                                Estado Civil
                            </label>
                            <select
                                id="MaritalStatusId"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('MaritalStatusId')}
                            >
                                <option>Selecciona tu estado civil</option>
                                {maritalStatus?.map((status: { MaritalStatusId: number; Name: string }) => (
                                    <option key={status.MaritalStatusId} value={status.MaritalStatusId}>
                                        {status.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Información Laboral */}
                <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Información Laboral</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="EmployeeId" className="block text-sm font-medium text-gray-900">
                                Identificación
                            </label>
                            <input
                                type="number"
                                placeholder="Escribe tu identificación laboral aquí"
                                id="EmployeeId"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('EmployeeId')}
                            />
                        </div>
                        <div>
                            <label htmlFor="HiringDate" className="block text-sm font-medium text-gray-900">
                                Fecha de Contratación
                            </label>
                            <input
                                type="date"
                                id="HiringDate"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('HiringDate')}
                            />
                        </div>
                        <div>
                            <label htmlFor="NumberChlidren" className="block text-sm font-medium text-gray-900">
                                Número de Hijos
                            </label>
                            <input
                                type="number"
                                placeholder="Escribe el número de hijos aquí"
                                id="NumberChlidren"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('NumberChlidren')}
                            />
                        </div>
                        <div>
                            <label htmlFor="AvailableVacationDays" className="block text-sm font-medium text-gray-900">
                                Días de Vacaciones Disponibles
                            </label>
                            <input
                                type="number"
                                placeholder="Escribe tus días de vacaciones aquí"
                                id="AvailableVacationDays"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('AvailableVacationDays')}
                            />
                        </div>
                    </div>
                </div>

                {/* Contacto */}
                <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-900">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                placeholder="Escribe tu correo electrónico aquí"
                                id="Email"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('Email')}
                            />
                        </div>
                        <div>
                            <label htmlFor="CellPhone" className="block text-sm font-medium text-gray-900">
                                Número de Teléfono
                            </label>
                            <input
                                type='tel'
                                placeholder="Escribe tu número de teléfono aquí"
                                id="CellPhone"
                                className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                                {...register('CellPhone')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}
            <button
                type="submit"
                disabled={mutation.isPending}
                className="px-6 w-32 py-2 sm:py-3 mt-4 text-white bg-dodger-blue-600 rounded-md shadow-sm hover:bg-dodger-blue-600 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 transition-all mx-auto block"
            >
                <div className="flex justify-center items-center">
                    {mutation.isPending ? (
                        <Spinner />
                    ) : (
                        <span>Registrarse</span>
                    )}
                </div>
            </button>
        </form>
    );
};

export default RegisterForm;
