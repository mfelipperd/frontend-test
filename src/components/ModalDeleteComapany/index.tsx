import { ICompany } from "@/interfaces/ICompany";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, Trash2, Undo2 } from "lucide-react";
import { useModalDeleteController } from "./modalDeleteCompany.controller";

export interface ModalDeleteCompanyProps {
  isOpen: boolean;
  onClose: () => void;
  companyData: ICompany;
}

export const ModalDeleteCompany = ({
  isOpen,
  onClose,
  companyData,
}: ModalDeleteCompanyProps) => {
  const { loading, handleDeleteCompany } = useModalDeleteController({
    isOpen,
    onClose,
    companyData,
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          <h1 className="text-2xl font-semibold">Deletar Empresa</h1>
        </DialogTitle>
        <p className="mb-4">
          Tem certeza que deseja deletar a empresa{" "}
          <span className="font-extrabold">
            {companyData.name + " " + companyData.cnpj}
          </span>
          ?
        </p>
        <div className="flex gap-4">
          <Button className="flex-1 gap-2" onClick={onClose}>
            <Undo2 size={20} />
            Cancelar
          </Button>
          <Button
            className="flex-1"
            variant="destructive"
            onClick={handleDeleteCompany}
          >
            {" "}
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Trash2 size={20} />
            )}
            Deletar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
