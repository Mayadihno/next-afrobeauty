import { ICONS } from "@/utils/icons";
import React from "react";

interface TableRowProps {
  location: string;
  express: string;
  standard: string;
  overseas: string;
  postal: string;
}
const ShippingTable = ({
  location,
  express,
  standard,
  postal,
  overseas,
}: TableRowProps) => {
  return (
    <tr>
      <td className="border p-3 bg-[#333333] text-white font-semibold flex flex-col items-center">
        <ICONS.delivery size={50} color="#B10C62" />
        {location}
      </td>
      <td className="shadow-md rounded-[2px] p-3 text-center">{express}</td>
      <td className="shadow-md rounded-[2px] p-3 text-center">{standard}</td>
      <td className="shadow-md rounded-[2px] p-3 text-center">{overseas}</td>
      <td className="shadow-md rounded-[2px] p-3 text-center">{postal}</td>
    </tr>
  );
};

export default ShippingTable;
