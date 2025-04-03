import { useCompanyService } from "@/services/company/company.service";
import { ModalDeleteCompanyProps } from ".";

export const useModalDeleteController = ({
  onClose,
  companyData,
}: Partial<ModalDeleteCompanyProps>) => {
  const { deleteCompany, loading } = useCompanyService();
  const handleDeleteCompany = async () => {
    if (!companyData) return;
    const response = await deleteCompany(companyData.id);
    if (!response) return;
    if (onClose) {
      onClose();
    }
  };
  return {
    loading,
    handleDeleteCompany,
  };
};
