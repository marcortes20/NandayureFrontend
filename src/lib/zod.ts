import { number, string, z } from "zod";

export const LoginSchema = z.object({
  UserId: z.string().refine((val) => !isNaN(Number(val)), {
    message: "UserId must be a number",
}),
Password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña no puede tener más de 32 caracteres"),
});

export const RegisterSchema = z.object({
  UserId: z.string().refine((val) => !isNaN(Number(val)), {
    message: "UserId must be a number",
  }),
  Mail: z.string().email("El correo electrónico no es válido"),
  UserName: z.string().min(1, "El nombre de usuario es requerido"),
  Name: z.string().min(1, "El nombre es requerido"),
  Password: z.string({ required_error: "La contraseña es requerida" })
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña no puede tener más de 32 caracteres"),
});