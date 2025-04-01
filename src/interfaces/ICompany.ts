export interface ICompany {
  id: number;
  name: string;
  cnpj: string;
  tradeName: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
}

export type IUpdateCompany = Partial<
  Omit<ICompany, "id" | "createdAt" | "updatedAt">
>;
