import RegisterForm from "@/components/register/register-form";
import { titleFont } from "@/config/fonts";

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-4 sm:px-6 lg:px-8 py-24 select-none">
        <div className="w-full sm:w-96 p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h5 className={`${titleFont.className} flex justify-center mb-3 text-lg sm:text-2xl font-bold tracking-tight text-gray-900`}>
            Registro
          </h5>
          <RegisterForm />
        </div>
      </main>
    )
}