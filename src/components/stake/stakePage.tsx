import StakeData from "@/components/stake/stakeData/stakeData";
import Explainer from "../shared/explainer";
import { EPage } from "@/lib/types";
import { Container } from "../ui/container";
import StakeTabs from "./stakeTabs";

const stakePage = () => {
  return (
    <div className="">
      <Container className="w-[600px] pt-[44px]">
        <Explainer page={EPage.STAKE} />
        <StakeData />
        <StakeTabs />
      </Container>
    </div>
  );
};

export default stakePage;
