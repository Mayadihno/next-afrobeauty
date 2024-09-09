import React from "react";
import { Blocks } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Blocks
        height="100"
        width="100"
        color="#B10C62"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </div>
  );
};

export default Loader;
