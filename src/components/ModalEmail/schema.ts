import { z } from "zod";

export const createEmailSchema = z.object({
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "Formato inválido de e-mail",
    })
    .email("Digite um e-mail válido"),
  active: z.boolean().optional().default(true),
});

export type ICreateEmail = z.infer<typeof createEmailSchema>;
