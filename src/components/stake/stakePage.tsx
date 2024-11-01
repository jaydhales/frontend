import type { ReactNode } from "react";
import StakeData from "@/components/stake/stakeData/stakeData";
import Explainer from "../shared/explainer";
import { EPage } from "@/lib/types";
import { Container } from "../ui/container";

const stakePage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <Container className="w-[600px] pt-[44px]">
        <Explainer page={EPage.STAKE} />
        <StakeData />
        {children}
      </Container>
    </div>
  );
};

export default stakePage;
