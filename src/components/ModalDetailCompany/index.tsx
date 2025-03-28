import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { ICompany } from "@/interfaces/ICompany";
import { Form } from "../ui/form";
import InputControlled from "../InputControlled";
import { Button } from "../ui/button";
import { PenLine, Undo2 } from "lucide-react";
import { useModalDetailController } from "./modalDetailcompanu.controller";
export interface ModalDetailCompanyProps {
  companyData: ICompany;
  isOpen: boolean;
  onClose: () => void;
}
export const ModalDetailCompany = ({
  companyData,
  isOpen,
  onClose,
}: ModalDetailCompanyProps) => {
  const controller = useModalDetailController({ companyData, isOpen, onClose });
  const { form } = controller;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          <h1 className="text-2xl font-semibold">Detalhes da empresa</h1>
        </DialogTitle>
        {controller.isEditing ? (
          <Form {...controller.form}>
            <form
              action=""
              onSubmit={controller.form.handleSubmit(controller.handleSubmit)}
            >
              <InputControlled
                name="name"
                control={form.control}
                label="Nome da empresa"
                defaultValue={companyData.name}
                placeholder="Nome da empresa"
                className="mb-4"
              />
              <InputControlled
                name="cnpj"
                control={form.control}
                label="CNPJ"
                defaultValue={companyData.cnpj}
                placeholder="CNPJ"
                className="mb-4"
              />
              <InputControlled
                name="tradeName"
                control={form.control}
                label="Nome fantasia"
                defaultValue={companyData.tradeName}
                placeholder="Nome fantasia"
                className="mb-4"
              />
              <InputControlled
                name="address"
                control={form.control}
                label="Endereço"
                defaultValue={companyData.address}
                placeholder="Endereço"
                className="mb-4"
              />
              <div className="flex gap-4 w-full mt-10">
                <Button
                  type="button"
                  className="flex-1"
                  variant="outline"
                  onClick={() => controller.setIsEditing(false)}
                >
                  <Undo2 size={20} /> Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  <PenLine size={20} />
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="transition-all duration-300 fade-in-out ">
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">Nome da empresa</span>
                <p className="text-lg">{companyData.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">CNPJ</span>
                <p className="text-lg">{companyData.cnpj}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">Nome fantasia</span>
                <p className="text-lg">{companyData.tradeName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">Endereço</span>
                <p className="text-lg">{companyData.address}</p>
              </div>
            </div>

            <Button
              type="button"
              className="w-full mt-10"
              onClick={() => controller.setIsEditing(true)}
            >
              <PenLine size={20} />
              Editar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
