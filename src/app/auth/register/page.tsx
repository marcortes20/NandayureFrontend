import { titleFont } from "@/config/fonts";
import RegisterForm from "@/modules/auth/register/components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 py-6 sm:py-12">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h5 className={`${titleFont.className} text-center text-lg sm:text-2xl font-bold tracking-tight text-gray-900 mb-6`}>
          Registro de usuario
        </h5>
        <RegisterForm />
        
      </div>
    </main>
  );
}