// TODO: Portfolio will contain button to add coins and investment, and show chart for growth and prediction for Lagrange Extrapolation

import { AddInvestment } from "@/components/portfolio/AddInvestment";
import { GraphList } from "@/components/portfolio/GraphList";
const Page = () => {
  return (
    <>
      <div className="flex flex-col h-fit w-[50vw] md:w-[80vw] ml-5">
        <AddInvestment />
        <GraphList />
      </div>
    </>
  );
};

export default Page;
