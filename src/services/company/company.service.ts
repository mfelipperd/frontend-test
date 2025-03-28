import { ICompany } from "@/interfaces/ICompany";
import { api } from "../api";
import { useState } from "react";
import { toast } from "sonner";

export const useCompanyService = () => {
  const [data, setData] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getAllCompanies = async () => {
    try {
      setLoading(true);
      const response = await api.get<ICompany[]>("empresas");
      if (response.status !== 200) {
        toast.error("Failed to fetch companies");
      }
      setData(response.data);
    } catch (error) {
      toast.error(`Error fetching companies:${error}`);
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (company: ICompany) => {
    try {
      setLoading(true);
      const response = await api.post<ICompany>("empresas", company);
      if (response.status !== 201) {
        toast.error("Failed to create company");
      } else {
        toast.success("Company created successfully");
        setData((prev) => [...prev, response.data]);
        return true;
      }
    } catch (error) {
      toast.error(`Error creating company: ${error}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (company: ICompany, id: number) => {
    try {
      setLoading(true);
      const response = await api.put<ICompany>(`empresas/${id}`, company);
      if (response.status !== 200) {
        toast.error("Failed to update company");
      } else {
        toast.success("Company updated successfully");
        setData((prev) =>
          prev.map((item) => (item.id === company.id ? response.data : item))
        );
        return true;
      }
    } catch (error) {
      toast.error(`Error updating company: ${error}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id: number) => {
    try {
      setLoading(true);
      const response = await api.delete<ICompany>(`empresas/${id}`);
      if (response.status !== 200) {
        toast.error("Failed to delete company");
      } else {
        toast.success("Company deleted successfully");
        setData((prev) => prev.filter((item) => item.id !== id));
        return true;
      }
    } catch (error) {
      toast.error(`Error deleting company: ${error}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteManyCompanies = async (ids: number[]) => {
    try {
      setLoading(true);
      const response = await api.delete<ICompany>(`empresas`, {
        data: { ids },
      });
      if (response.status !== 200) {
        toast.error("Failed to delete companies");
      } else {
        toast.success("Companies deleted successfully");
        setData((prev) => prev.filter((item) => !ids.includes(item.id)));
        return true;
      }
    } catch (error) {
      toast.error(`Error deleting companies: ${error}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllCompanies,
    loading,
    data,
    createCompany,
    updateCompany,
    deleteCompany,
    deleteManyCompanies,
  };
};
