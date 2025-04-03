import { useForm } from "react-hook-form";
import { Dialog, DialogContent } from "../ui/dialog";
import { Form } from "../ui/form";
import InputControlled from "../InputControlled";
import { Button } from "../ui/button";
import { TableEmail } from "../TablemEmails";
import { useEmailService } from "@/services/emails/emails.service";
import { useEffect } from "react";
import { ICreatEmail } from "@/interfaces/IEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmailSchema } from "./schema";
import { Loader2, Plus } from "lucide-react";
import { EmailManagerTour } from "../EmailTour";

interface ModalEmailsProps {
  open: boolean;
  onClose: () => void;
}

export const ModalEmails = ({ onClose, open }: ModalEmailsProps) => {
  const { getAllEmails, data, createEmail, updateEmail, loading } =
    useEmailService();
  const form = useForm<ICreatEmail>({
    resolver: zodResolver(createEmailSchema),
  });

  useEffect(() => {
    getAllEmails();
  }, []);

  const handleCreatEmail = async (data: ICreatEmail) => {
    await createEmail(data);
  };

  const handleEnableEmail = async (params: boolean, id: number) => {
    return await updateEmail({ active: params }, id);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-fit min-w-fit max-w-fit email-manager-title">
        <EmailManagerTour />
        <Form {...form}>
          <form
            action=""
            className="flex items-center gap-4"
            onSubmit={form.handleSubmit(handleCreatEmail)}
          >
            <InputControlled
              control={form.control}
              name="email"
              placeholder="Novo email"
            />
            <Button className="email-add-button">
              {loading ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Plus size={12} />
              )}
              Cadastrar novo Email
            </Button>
          </form>
        </Form>
        <TableEmail
          data={data}
          handleDeleteEmail={() => {}}
          handleSelectEmail={() => {}}
          handleEnableEmail={handleEnableEmail}
        />
      </DialogContent>
    </Dialog>
  );
};
