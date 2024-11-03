import { EPage } from "@/lib/types";
import Explainer from "../shared/explainer";
import { Card } from "../ui/card";
import CreateVaultForm from "./createVaultForm";

export default function CreateVaultPage() {
  return (
    <div>
      {/* <PageHeader> Create Vault</PageHeader> */}
      <div className="flex w-[650px] flex-col items-center">
        <div className="pt-[44px]" />
        <Explainer page={EPage.CREATE_VAULT} />
        <Card className="md:w-[650px]">
          <CreateVaultForm />
        </Card>
      </div>
    </div>
  );
}
