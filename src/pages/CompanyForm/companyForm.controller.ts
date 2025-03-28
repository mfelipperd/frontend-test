import { CompanyFormData, companySchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useCompanyService } from "@/services/company/company.service";
import { ICompany } from "@/interfaces/ICompany";

export const useCompanyFormController = () => {
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });
  const navigate = useNavigate();

  const { createCompany } = useCompanyService();

  const onSubmit = async (data: CompanyFormData) => {
    const result = await createCompany(data as ICompany);
    if (result) {
      navigate("/");
    }
  };

  return {
    form,
    onSubmit,
    navigate,
  };
};
