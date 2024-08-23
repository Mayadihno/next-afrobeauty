import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const SellerProductLoader = () => {
  return (
    <div className="w-full flex my-14 items-center justify-center">
      <ThreeCircles
        visible={true}
        height="120"
        width="120"
        color="#B10C62"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default SellerProductLoader;
