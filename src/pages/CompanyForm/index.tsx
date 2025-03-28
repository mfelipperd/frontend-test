import InputControlled from "@/components/InputControlled";
import { PageWrapper } from "@/components/PageWarapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PlusIcon, Undo2 } from "lucide-react";

import maskCnpj from "@/utis/maskCnpj";
import { useCompanyFormController } from "./companyForm.controller";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const CompanyForm = () => {
  const controller = useCompanyFormController();
  const { form } = controller;
  return (
    <PageWrapper>
      <Card className="flex flex-col gap-8 w-full max-w-[600px] mx-auto mt-10 ">
        <CardTitle className="flex justify-center items-center">
          <h1 className="text-2xl font-semibold">Cadastras nova empresa</h1>
        </CardTitle>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(controller.onSubmit)}
              className="space-y-4"
            >
              <InputControlled
                control={form.control}
                name="name"
                label="Nome da empresa"
                placeholder="Digite o nome da empresa"
              />
              <InputControlled
                control={form.control}
                name="cnpj"
                label="CNPJ"
                placeholder="Digite o CNPJ da empresa"
                mask={maskCnpj}
              />
              <InputControlled
                control={form.control}
                name="tradeName"
                label="Nome fantasia"
                placeholder="Digite o nome fantasia da empresa"
              />
              <InputControlled
                control={form.control}
                name="address"
                label="Endereço"
                placeholder="Digite o endereço da empresa"
              />

              <div className="flex gap-4 w-full">
                <Button
                  type="button"
                  className="flex-1"
                  variant="outline"
                  onClick={() => controller.navigate(-1)}
                >
                  <Undo2 size={20} /> Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  <PlusIcon size={20} />
                  Cadastrar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default CompanyForm;
