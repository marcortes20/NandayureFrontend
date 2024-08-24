import { string, z } from "zod";

export const LoginSchema = z.object({
    EmployeeId: z.string().refine((val) => !isNaN(Number(val)), {
        message:
            "El número de identificación no debe incluir caracteres especiales.",
    }),
    Password: string({ required_error: "La contraseña es requerida" })
        .min(1, "La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(32, "La contraseña no puede tener más de 32 caracteres"),
});

export const RegisterSchema = z.object({
    EmployeeId: z.string().refine((val) => !isNaN(Number(val)), {
        message:
            "El número de identificación no debe incluir caracteres especiales.",
    }),
    Mail: z.string().email("El correo electrónico no es válido"),
    UserName: z.string().min(1, "El nombre de usuario es requerido"),
    Name: z.string().min(1, "El nombre es requerido"),
    Password: z
        .string({ required_error: "La contraseña es requerida" })
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(32, "La contraseña no puede tener más de 32 caracteres"),
});

export const ResetPasswordSchema = z
    .object({
        Password: string({ required_error: "La contraseña es requerida" })
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .max(32, "La contraseña no puede tener más de 32 caracteres"),
        ConfirmPassword: string({ required_error: "La confirmación de la contraseña es requerida" })
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .max(32, "La contraseña no puede tener más de 32 caracteres"),
    })
    .refine((data) => data.Password === data.ConfirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["ConfirmPassword"],
    });

export const ForgotPasswordSchema = z.object({
    Mail: z.string().email("El correo electrónico no es válido"),
});
