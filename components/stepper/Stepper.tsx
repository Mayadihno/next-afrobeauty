import { ICONS } from "@/utils/icons";
import React from "react";

const Stepper = ({ active }: { active: number }) => {
  return (
    <div className="w-[80%] flex justify-center items-center ml-[300px]">
      <ol className="flex items-center w-full mb-4 sm:mb-5">
        <li
          className={`flex w-full items-center text-blue-600 dark:text-blue-500 
          ${
            active > 1
              ? "after:w-full after:h-1 after:border-b after:border-blue-800 after:border-4 after:inline-block dark:after:border-blue-800"
              : "after:w-full after:h-1 after:border-b after:border-gray-300 after:border-4 after:inline-block dark:after:border-gray-700"
          }`}
        >
          {active === 1 ? (
            <div className="flex flex-col">
              <div
                className="flex items-center justify-center w-8 h-8 relative
             bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0"
              >
                <div
                  className="flex items-center justify-center w-5 h-5
               bg-blue-500 rounded-full lg:h-8 lg:w-8 dark:bg-blue-800 shrink-0 animate-pulse"
                />
                <div className="absolute bottom-10 pb-2 pl-2 text-sm">
                  <h2>Address</h2>
                </div>
                {active === 1 && (
                  <div className="absolute top-10 pt-2 pl-2 text-sm text-nowrap">
                    <h2>in progress</h2>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-10 lg:w-10 dark:bg-blue-800 shrink-0">
                <ICONS.address size={25} />
              </div>
              <div className="absolute text-xs pt-1 ml-[-10px]">
                <h2>comepleted</h2>
              </div>
            </div>
          )}
        </li>
        <li
          className={`flex w-full items-center text-blue-600 dark:text-blue-500 
          ${
            active > 2
              ? "after:w-full after:h-1 after:border-b after:border-blue-800 after:border-4 after:inline-block dark:after:border-blue-800"
              : "after:w-full after:h-1 after:border-b after:border-gray-300 after:border-4 after:inline-block dark:after:border-gray-700"
          }`}
        >
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <ICONS.card />
          </div>
        </li>
        <li className="flex items-center w-full">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg
              className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
            </svg>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default Stepper;
