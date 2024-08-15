import LoginForm from "@/components/login/login-form";
import { titleFont } from "@/config/fonts";

const LoginPage = () => {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 sm:px-6 lg:px-8 py-24 select-none">
      <div className="w-full sm:w-96 p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className={`${titleFont.className} flex justify-center mb-3 text-lg sm:text-2xl font-bold tracking-tight text-gray-900`}>
          Inicio de sesión
        </h5>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;