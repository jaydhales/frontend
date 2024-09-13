import PageHeader from "../shared/pageHeader";
import { Card } from "../ui/card";
import CreateVaultForm from "./createVaultForm";

export default function CreateVaultPage() {
  return (
    <div>
      <PageHeader> Create Vault</PageHeader>
      <div className="w-[600px] flex flex-col items-center">
        <br />
        <Card className="md:w-[450px]">
          <CreateVaultForm />
        </Card>
      </div>
    </div>
  );
}
