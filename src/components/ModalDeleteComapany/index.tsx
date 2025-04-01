import { ICompany } from "@/interfaces/ICompany";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useCompanyService } from "@/services/company/company.service";
import { Trash2, Undo2 } from "lucide-react";

interface ModalDeleteCompanyProps {
  isOpen: boolean;
  onClose: () => void;
  companyData: ICompany;
}

export const ModalDeleteCompany = ({
  isOpen,
  onClose,
  companyData,
}: ModalDeleteCompanyProps) => {
  const { deleteCompany } = useCompanyService();
  const handleDeleteCompany = async () => {
    const response = await deleteCompany(companyData.id);
    if (!response) return;
    onClose();
  };
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
            <Trash2 size={20} />
            Deletar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
