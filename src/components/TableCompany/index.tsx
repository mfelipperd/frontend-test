import { ICompany } from "@/interfaces/ICompany";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TableSkeleton } from "../TableSkeleton";
import { StarIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utis/dateFormatter";
interface CompanyListProps {
  data: ICompany[];
  handleSelectCompany: (company: ICompany) => void;
  handleDeleteCompany: (company: ICompany) => void;
  handleFavCompany: (company: ICompany) => void;
}
export const TableCompany = ({
  data,
  handleSelectCompany,
  handleDeleteCompany,
  handleFavCompany,
}: CompanyListProps) => {
  return (
    <Table className="relative h-[60vh] overflow-y-auto scrollable-content company-table">
      <TableHeader className="sticky top-0 z-40 bg-card">
        <TableHead>Nome</TableHead>
        <TableHead>CNPJ</TableHead>
        <TableHead>Nome Fantasia</TableHead>
        <TableHead>Endereço</TableHead>
        <TableHead>Data de Criação</TableHead>
        <TableHead>Data de Atualização</TableHead>
        <TableHead>Ações</TableHead>
      </TableHeader>
      <TableBody>
        {!data ? (
          <TableSkeleton />
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Nenhuma empresa encontrada.
            </TableCell>
          </TableRow>
        ) : (
          data.map((company) => {
            return (
              <TableRow
                className="view-company-button"
                key={company.id}
                onClick={() => handleSelectCompany(company)}
              >
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.cnpj}</TableCell>
                <TableCell>{company.tradeName}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>{dateFormatter(company.createdAt)}</TableCell>
                <TableCell>{dateFormatter(company.updatedAt)}</TableCell>
                <TableCell className="flex gap-4">
                  <Trash2
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCompany(company);
                    }}
                    className="cursor-pointer delete-company-button"
                    size={16}
                  />{" "}
                  <StarIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavCompany(company);
                    }}
                    className={cn(
                      "cursor-pointer favorite-company-button ",
                      company.favorite && "text-yellow-500"
                    )}
                    size={16}
                  />
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};
