import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  cnpj: z
    .string()
    .min(14, "CNPJ must be at least 14 characters")
    .max(18, "CNPJ must be at most 18 characters"),
  tradeName: z.string().min(2, "Trade name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export type CompanyFormData = z.infer<typeof companySchema>;
