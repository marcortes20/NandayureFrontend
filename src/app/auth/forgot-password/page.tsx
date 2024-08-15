import { titleFont } from "@/config/fonts";
import Link from "next/link";

const ForgotPasswordPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-4 sm:px-6 lg:px-8 py-24 select-none">
            <div className="w-full sm:w-96 p-6 bg-white border border-gray-200 rounded-lg shadow">
                <h5 className={`${titleFont.className} mb-3 text-base font-semibold text-gray-900 md:text-xl`}>
                    Recuperar contraseña
                </h5>
                <p className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                    Por favor, introduce tu dirección de correo electrónico. Recibirás un enlace para crear una nueva contraseña.
                </p>
                <form>
                    <div className="mt-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Escribe tu correo electrónico aquí"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 py-2 px-4 bg-dodger-blue-600 hover:bg-dodger-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        Enviar enlace
                    </button>
                    <section>
                        <Link href="/auth/login" className="block mt-4 text-sm text-center text-dodger-blue-600 hover:underline">
                            Volver a inicio de sesión
                        </Link>
                    </section>
                </form>
            </div>
        </main>
    );
};

export default ForgotPasswordPage;