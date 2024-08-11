import React from "react";
import BurnTable from "./burnTable/burnTable";
import { Card } from "../ui/card";
import { Container } from "../ui/container";

export default function PortfolioPage() {
  const isApe = false;
  return (
    <div>
      <Container>
        <Card>
          <BurnTable isApe={isApe} />
        </Card>
      </Container>
    </div>
  );
}
