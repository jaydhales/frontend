import StakeData from "@/components/stake/stakeData/stakeData";
import Explainer from "../shared/explainer";
import { EPage } from "@/lib/types";
import { Container } from "../ui/container";
import PageHeadingSpace from "../shared/pageHeadingSpace";

const stakePage = () => {
  return (
    <div className="">
      <PageHeadingSpace />
      <Container className="max-w-[600px]  md:w-[600px]">
        <Explainer page={EPage.STAKE} />
        <StakeData />
        <StakeTabs />
      </Container>
    </div>
  );
};

export default stakePage;
