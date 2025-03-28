import { ICompany } from "@/interfaces/ICompany";
import { Card, CardContent } from "../ui/card";

interface CardCompanyProps {
  company: ICompany;
}
export const CardCompany = ({ company }: CardCompanyProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4 mt-4">
          <div className="w-full flex justify-between gap-2">
            <p className="text-lg">{company.name}</p>
            <p className="text-lg">{company.cnpj}</p>
          </div>
          <div className="flex flex-col gap-2"></div>

          <div className="flex flex-col gap-2">
            <p className="text-lg">{company.address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
