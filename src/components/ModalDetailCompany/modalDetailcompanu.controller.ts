import { useCompanyService } from "@/services/company/company.service";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ModalDetailCompanyProps } from ".";
import { ICompany } from "@/interfaces/ICompany";

export const useModalDetailController = ({
  companyData,
  onClose,
}: ModalDetailCompanyProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { updateCompany } = useCompanyService();

  const form = useForm({
    defaultValues: { ...companyData },
  });

  const handleSubmit = async (data: Partial<ICompany>) => {
    const response = await updateCompany(data as ICompany, companyData.id);
    if (response) {
      onClose();
    }
  };

  return {
    isEditing,
    handleSubmit,
    form,
    setIsEditing,
  };
};
