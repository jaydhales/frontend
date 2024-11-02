import type { ReactNode } from "react";
import StakeData from "@/components/stake/stakeData/stakeData";
import Explainer from "../shared/explainer";
import { EPage } from "@/lib/types";
import { Container } from "../ui/container";
import PageHeadingSpace from "../shared/pageHeadingSpace";

const stakePage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <Container className="max-w-[600px]  md:w-[600px]">
        <Explainer page={EPage.STAKE} />
        <StakeData />
        {children}
      </Container>
    </div>
  );
};

export default stakePage;
