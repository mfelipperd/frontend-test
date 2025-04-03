import { IEmail } from "@/interfaces/IEmail";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TableSkeleton } from "../TableSkeleton";
import { Power, PowerOff, Trash2 } from "lucide-react";
import { dateFormatter } from "@/utis/dateFormatter";

interface EmailListProps {
  data: IEmail[];
  handleSelectEmail: (email: IEmail) => void;
  handleDeleteEmail: (email: IEmail) => void;
  handleEnableEmail: (params: boolean, id: number) => void;
}

export const TableEmail = ({
  data,
  handleSelectEmail,
  handleDeleteEmail,
  handleEnableEmail,
}: EmailListProps) => {
  return (
    <Table className="relative h-[60vh] overflow-y-auto scrollable-content email-table">
      <TableHeader className="sticky top-0 z-40 bg-card">
        <TableHead>Email</TableHead>
        <TableHead>Ativo</TableHead>
        <TableHead>Data de Criação</TableHead>
        <TableHead>Ações</TableHead>
      </TableHeader>
      <TableBody>
        {!data ? (
          <TableSkeleton />
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Nenhum e-mail encontrado.
            </TableCell>
          </TableRow>
        ) : (
          data.map((email) => (
            <TableRow
              key={email.id}
              className="view-email-button"
              onClick={() => handleSelectEmail(email)}
            >
              <TableCell>{email.email}</TableCell>
              <TableCell>{email.active ? "Sim" : "Não"}</TableCell>
              <TableCell>{dateFormatter(email.createdAt)}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Trash2
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEmail(email);
                  }}
                  className="cursor-pointer delete-email-button"
                  size={16}
                />
                <div>
                  {email?.active ? (
                    <Power
                      size={16}
                      onClick={() => handleEnableEmail(false, email.id)}
                    />
                  ) : (
                    <PowerOff
                      size={16}
                      onClick={() => handleEnableEmail(true, email.id)}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
