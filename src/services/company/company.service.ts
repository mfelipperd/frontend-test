import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICompany, IUpdateCompany } from "@/interfaces/ICompany";
import { api } from "../api";
import { toast } from "sonner";

export const useCompanyService = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading: loading,
    refetch: getAllCompanies,
  } = useQuery<ICompany[]>({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await api.get<ICompany[]>("companies");
      return response.data;
    },
  });

  const { mutateAsync: createCompany } = useMutation({
    mutationFn: async (company: ICompany) => {
      const response = await api.post<ICompany>("companies", {
        ...company,
        favorite: false,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Company created successfully");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (err) => {
      toast.error(`Error creating company: ${err}`);
    },
  });

  const { mutateAsync: updateCompany } = useMutation({
    mutationFn: async ({
      id,
      company,
    }: {
      id: number;
      company: IUpdateCompany;
    }) => {
      const response = await api.patch<IUpdateCompany>(
        `companies/${id}`,
        company
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Company updated successfully");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (err) => {
      toast.error(`Error updating company: ${err}`);
    },
  });

  const { mutateAsync: deleteCompany } = useMutation({
    mutationFn: async (id: number) => {
      try {
        await api.delete(`companies/${id}`);
        return true;
      } catch {
        return false;
      }
    },
    onSuccess: () => {
      toast.success("Company deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (err) => {
      toast.error(`Error deleting company: ${err}`);
    },
  });

  const { mutateAsync: deleteManyCompanies } = useMutation({
    mutationFn: async (ids: number[]) => {
      await api.delete(`companies`, { data: { ids } });
    },
    onSuccess: () => {
      toast.success("Companies deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      return true;
    },
    onError: (err) => {
      toast.error(`Error deleting companies: ${err}`);
      return false;
    },
  });

  return {
    data,
    loading,
    getAllCompanies,
    createCompany,
    updateCompany: (company: IUpdateCompany, id: number) =>
      updateCompany({ id, company }),
    deleteCompany,
    deleteManyCompanies,
  };
};
