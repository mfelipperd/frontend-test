import { useCompanyService } from "@/services/company/company.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalDetailCompanyProps } from ".";
import { IUpdateCompany } from "@/interfaces/ICompany";

export const useModalDetailController = ({
  companyData,
  onClose,
}: ModalDetailCompanyProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { updateCompany, loading } = useCompanyService();

  const form = useForm<IUpdateCompany>({
    defaultValues: {
      address: companyData.address,
      cnpj: companyData.cnpj,
      favorite: companyData.favorite,
      name: companyData.name,
      tradeName: companyData.tradeName,
    },
  });
  const handleSubmit = async (data: IUpdateCompany) => {
    const response = await updateCompany(data, companyData.id);
    if (response) {
      setIsEditing(false);
      onClose();
    }
  };

  useEffect(() => {
    if (companyData) {
      form.reset({
        address: companyData.address,
        cnpj: companyData.cnpj,
        favorite: companyData.favorite,
        name: companyData.name,
        tradeName: companyData.tradeName,
      });
    }
  }, [companyData, form]);

  return {
    isEditing,
    handleSubmit,
    form,
    setIsEditing,
    loading,
  };
};
