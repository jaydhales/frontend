import PageHeader from "../shared/pageHeader";
import { Card } from "../ui/card";
import CreateVaultForm from "./createVaultForm";

export default function CreateVaultPage() {
  return (
    <div>
      <PageHeader> Create Vault</PageHeader>
      <div className="w-[600px] flex flex-col items-center">
        <h2 className="text-center py-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
          dolorem, quisquam perferendis tenetur quod nam quia dolorum voluptate!
          Totam similique incidunt labore, in vero suscipit cum pariatur ad
          veritatis impedit.
        </h2>
        <br />
        <Card className="md:w-[450px]">
          <CreateVaultForm />
        </Card>
      </div>
    </div>
  );
}
