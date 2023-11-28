import { ColorRing } from "react-loader-spinner";

export const GreenLoader = () => {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#006A45", "#009373", "#006A45", "#009373", "#006A45"]}
    />
  );
};
