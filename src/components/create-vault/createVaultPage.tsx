import { EPage } from "@/lib/types";
import Explainer from "../shared/explainer";
import { Card } from "../ui/card";
import CreateVaultForm from "./createVaultForm";
import { Container } from "../ui/container";

export default function CreateVaultPage() {
  return (
    <div>
      {/* <PageHeader> Create Vault</PageHeader> */}
        <div className="pt-[44px]" />
      <Container className="flex max-w-[650px] flex-col items-center md:w-[650px]">
        <Explainer page={EPage.CREATE_VAULT} />
        <Card className="md:w-[650px]">
          <CreateVaultForm />
        </Card>
      </Container>
    </div>
  );
}
