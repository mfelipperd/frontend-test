import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreatEmail, IEmail } from "@/interfaces/IEmail";
import { api } from "../api";
import { toast } from "sonner";
import { useState } from "react";

export const useEmailService = () => {
  const queryClient = useQueryClient();
  const [isMutating, setIsMutating] = useState(false);

  const {
    data = [],
    isLoading: isFetching,
    refetch: getAllEmails,
  } = useQuery<IEmail[]>({
    queryKey: ["emails"],
    queryFn: async () => {
      const response = await api.get<IEmail[]>("emails");
      return response.data;
    },
  });

  const { mutateAsync: createEmail } = useMutation({
    mutationFn: async (email: ICreatEmail) => {
      setIsMutating(true);
      const response = await api.post<ICreatEmail>("emails", email);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Email cadastrado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["emails"] });
    },
    onError: (err) => {
      toast.error(`Erro ao cadastrar e-mail: ${err}`);
    },
    onSettled: () => setIsMutating(false),
  });

  const { mutateAsync: updateEmail } = useMutation({
    mutationFn: async ({
      id,
      email,
    }: {
      id: number;
      email: Partial<IEmail>;
    }) => {
      setIsMutating(true);
      const response = await api.patch<IEmail>(`emails/${id}`, email);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Email atualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["emails"] });
    },
    onError: (err) => {
      toast.error(`Erro ao atualizar e-mail: ${err}`);
    },
    onSettled: () => setIsMutating(false),
  });

  const { mutateAsync: deleteEmail } = useMutation({
    mutationFn: async (id: number) => {
      setIsMutating(true);
      try {
        await api.delete(`emails/${id}`);
        return true;
      } catch {
        return false;
      }
    },
    onSuccess: () => {
      toast.success("Email removido com sucesso");
      queryClient.invalidateQueries({ queryKey: ["emails"] });
    },
    onError: (err) => {
      toast.error(`Erro ao remover e-mail: ${err}`);
    },
    onSettled: () => setIsMutating(false),
  });

  return {
    data,
    loading: isFetching || isMutating,
    getAllEmails,
    createEmail,
    updateEmail: (email: Partial<IEmail>, id: number) =>
      updateEmail({ id, email }),
    deleteEmail,
  };
};
