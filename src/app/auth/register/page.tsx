import { titleFont } from "@/config/fonts";
import RegisterForm from "@/modules/auth/register/components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center bg-gray-100  px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full border shadow rounded-sm max-w-4xl px-6 py-2">
        <h5 className={`${titleFont.className} text-center text-lg sm:text-2xl font-bold tracking-tight text-gray-900 mb-4`}>
          Registro de usuario
        </h5>
        <RegisterForm />
      </div>
    </main>
  );
}