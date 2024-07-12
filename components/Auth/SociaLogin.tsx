import { doSocialLogin } from "@/app/actions";
import { ICONS } from "@/utils/icons";
import React from "react";

const SociaLogin = () => {
  return (
    <div>
      <form action={doSocialLogin}>
        <div className="border w-fit mx-auto rounded-[20px] py-3 px-5 cursor-pointer mt-3">
          <button
            type="submit"
            name="action"
            value="google"
            className="flex items-center"
          >
            <ICONS.gogogle />
            <span className=" font-prociono font-semibold text-sm ml-2">
              Google
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SociaLogin;
