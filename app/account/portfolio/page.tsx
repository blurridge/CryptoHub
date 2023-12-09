// TODO: Portfolio will contain button to add coins and investment, and show chart for growth and prediction for Lagrange Extrapolation

import { GraphList } from "@/components/portfolio/GraphList";
const Page = () => {
  return (
    <>
      <div className="flex flex-col max-h-fit w-screen items-center justify-center">
        <GraphList />
      </div>
    </>
  );
};

export default Page;
