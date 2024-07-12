import { Loader } from "lucide-react";
import React from "react";

type SubmitButtonProp = {
  title: string;
  type: "submit" | "reset" | "button" | undefined;
  isLoading: boolean;
  loadingTitle: string;
};
const SubmitButton = ({
  title,
  type = "submit",
  isLoading = false,
  loadingTitle,
}: SubmitButtonProp) => {
  return (
    <div>
      {isLoading ? (
        <button
          type={type}
          disabled
          className="flex w-full justify-center font-ebgaramond !rounded-2xl bg-[#B10C62] 
          px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm
           hover:bg-[#b10c619f] focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-[#B10C62] items-center"
        >
          <Loader className=" w-4 h-4 mr-2 flex-shrink-0 animate-spin" />
          {loadingTitle}
        </button>
      ) : (
        <button
          type={type}
          className="flex w-full justify-center font-ebgaramond !rounded-2xl bg-[#B10C62] 
          px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm
           hover:bg-[#b10c61cd] focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-[#B10C62] items-center"
        >
          {title}
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
