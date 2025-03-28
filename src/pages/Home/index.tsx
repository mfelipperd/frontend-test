import { ModalDeleteCompany } from "@/components/ModalDeleteComapany";
import { ModalDetailCompany } from "@/components/ModalDetailCompany";
import { PageWrapper } from "@/components/PageWarapper";
import { TableCompany } from "@/components/TableCompany";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { useHomeController } from "./home.controller";

const Home = () => {
  const controller = useHomeController();
  return (
    <PageWrapper>
      <div className="space-y-6 p-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <p className="text-2xl">Empresas cadastradas</p>
              <div
                className="bg-slate-800  new-company-button  rounded-full w-64 truncate hover:w-72 cursor-pointer text-white p-2 overflow-hidden flex gap-2 items-center px-4 transition-all duration-300"
                onClick={() => controller.navigate("/create-company")}
              >
                <PlusIcon size={20} />
                <p className="-translate-x-1">Cadastrar nova empresa</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TableCompany
              handleFavCompany={controller.handleFavCompany}
              handleDeleteCompany={controller.handdleDeleteComapny}
              handleSelectCompany={controller.handleSeelectCompany}
              data={controller.data || []}
            />
          </CardContent>
        </Card>
      </div>
      {controller.selectCompany && (
        <>
          <ModalDetailCompany
            isOpen={controller.openModal}
            onClose={controller.handleControlModal}
            companyData={controller.selectCompany}
          />
          <ModalDeleteCompany
            companyData={controller.selectCompany}
            isOpen={controller.openModalDelete}
            onClose={controller.handleControlModalDelete}
          />
        </>
      )}
    </PageWrapper>
  );
};
export default Home;
