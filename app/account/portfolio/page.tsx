import { AddInvestment } from "@/components/portfolio/AddInvestment";
import { DayDropdown } from "@/components/portfolio/DayDropdown";
import { ExtrapolationDropdown } from "@/components/portfolio/ExtrapolationDropdown";
import { GraphList } from "@/components/portfolio/GraphList";

const Page = () => {
  return (
    <>
      <div className="flex flex-col h-fit w-[50vw] md:w-[80vw] ml-5 mt-5">
        <div className="flex gap-5">
          <AddInvestment />
          <ExtrapolationDropdown />
          <DayDropdown />
        </div>
        <GraphList />
      </div>
    </>
  );
};

export default Page;
