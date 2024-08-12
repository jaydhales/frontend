import React from "react";
import BurnTable from "./burnTable/burnTable";
import { Card } from "../ui/card";
import { Container } from "../ui/container";
import PageHeader from "../shared/pageHeader";

export default function PortfolioPage() {
  const isApe = true;
  return (
    <div>
      <PageHeader>Portfolio</PageHeader>
      <div className="pt-6"></div>
      <Container>
        <Card className="lg:w-[900px]">
          <BurnTable />
        </Card>
      </Container>
    </div>
  );
}
