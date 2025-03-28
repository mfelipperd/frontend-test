import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyService } from "@/services/company/company.service";
import { ICompany } from "@/interfaces/ICompany";

export const useHomeController = () => {
  const { getAllCompanies, data, updateCompany } = useCompanyService();
  const [selectCompany, setSelectCompany] = useState<ICompany>();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const navigate = useNavigate();

  const handleControlModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleControlModalDelete = () => {
    setOpenModalDelete((prev) => !prev);
  };

  const handleSeelectCompany = (company: ICompany) => {
    handleControlModal();
    setSelectCompany(company);
  };

  const handdleDeleteComapny = (company: ICompany) => {
    handleControlModalDelete();
    setSelectCompany(company);
  };

  const handleFavCompany = async (company: ICompany) => {
    const response = await updateCompany(
      { ...company, favorite: !company.favorite },
      company.id
    );
    if (response) {
      getAllCompanies();
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []);
  return {
    navigate,
    handleFavCompany,
    handdleDeleteComapny,
    handleSeelectCompany,
    data,
    selectCompany,
    openModal,
    handleControlModal,
    openModalDelete,
    handleControlModalDelete,
  };
};
