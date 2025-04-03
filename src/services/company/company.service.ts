import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICompany, IUpdateCompany } from "@/interfaces/ICompany";
import { api } from "../api";
import { toast } from "sonner";
import { useState } from "react";

export const useCompanyService = () => {
  const queryClient = useQueryClient();
  const [isMutating, setIsMutating] = useState(false);

  const {
    data = [],
    isLoading: isFetching,
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
      setIsMutating(true);
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
    onSettled: () => setIsMutating(false),
  });

  const { mutateAsync: updateCompany } = useMutation({
    mutationFn: async ({
      id,
      company,
    }: {
      id: number;
      company: IUpdateCompany;
    }) => {
      setIsMutating(true);
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
    onSettled: () => setIsMutating(false),
  });

  const { mutateAsync: deleteCompany } = useMutation({
    mutationFn: async (id: number) => {
      setIsMutating(true);
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
    onSettled: () => setIsMutating(false),
  });

  const { mutateAsync: deleteManyCompanies } = useMutation({
    mutationFn: async (ids: number[]) => {
      setIsMutating(true);
      await api.delete(`companies`, { data: { ids } });
    },
    onSuccess: () => {
      toast.success("Companies deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (err) => {
      toast.error(`Error deleting companies: ${err}`);
    },
    onSettled: () => setIsMutating(false),
  });

  return {
    data,
    loading: isFetching || isMutating,
    getAllCompanies,
    createCompany,
    updateCompany: (company: IUpdateCompany, id: number) =>
      updateCompany({ id, company }),
    deleteCompany,
    deleteManyCompanies,
  };
};
